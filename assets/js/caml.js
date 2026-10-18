/* Caml — comportements communs des pages et outils : coloration du code, boucle d'interaction, dérouleur
   d'appels récursifs, filtrage pas à pas, lecture d'un type et application partielle.

   PAGES
   Numéros de parties : <span class="calls" data-n="3"></span> dessine une trace d'appels indentée, un cran par
   partie (la dernière ligne en orange). Sommaire actif (.toc a[href^="#"] + .sec[id]), barre de lecture (#prog),
   vérifications de fin de partie (<div data-check="id1,id2"> ou <div data-check-ref="caml/cours-1-bases.html#s2"
   data-n="3"> : les premières questions de la banque dont ref vaut cette partie ; le bloc se masque si la banque
   n'en a pas), boutons « J'ai compris » (data-done="caml:<chapitre>:sN", via REV.wireDoneButtons).

   CODE — traité au chargement ET pour tout bloc ajouté plus tard par un script (QCM, corrigés, exercices) :
     <pre data-ml>let x = 1 ;;</pre>        bloc de code coloré, sans invite
     <code class="ml">x :: lst</code>       code en ligne coloré
     <code data-ml-ans>val a : int = 3</code>  une réponse de Caml en ligne (type en orange, valeur colorée)
     <pre data-ml-repl>                     boucle d'interaction : « # phrase ;; » puis la réponse de Caml
     # let a = 1 + 2 ;;
     val a : int = 3
     # let b =
         a * 2 ;;
     val b : int = 6
     </pre>
       Une phrase commence par « # » et s'arrête à la ligne qui finit par « ;; » ; ses lignes suivantes s'écrivent
       décalées de deux espaces (sous le texte qui suit « # »), elles sont rendues sans ce décalage. Tout ce qui suit,
       jusqu'au prochain « # », est la réponse : val…, - : …, Exception: …, Error: …, Warning … (recopiée telle
       qu'OCaml 4.14 l'affiche, sans les lignes de position « Line 1, characters … »). Écrire &lt; et &amp; dans le
       HTML (&lt;fun&gt;, &amp;&amp;).
       data-mode="show" (défaut : réponses visibles) | "reveal" (bouton « Réponse de Caml » sous chaque phrase) |
       "guess" (l'élève tape sa réponse puis compare ; champ vide = simple dévoilement) ; data-title="…" (bandeau).
       L'id et les classes du <pre> passent au bloc rendu.
     Coloration : jetons <code class="m-…"> (des <code>, pour que la typographie du site ne touche pas au code) :
       m-kw mot-clé · m-def nom défini par let / and · m-con constructeur (true, false, [], (), Failure…) ·
       m-mod module · m-num nombre · m-str chaîne ou caractère · m-com commentaire · m-op opérateur ·
       m-ar structure (->, |, ::, _) · m-exn failwith, invalid_arg, raise · m-end ;; · m-ty type · m-tv 'a ·
       m-fun <fun>.

   API (REV.caml)
     highlight(src[, typeMode]) → HTML coloré ; tokens(src[, typeMode]) → [{ t, v }] (t : classe sans « m- »).
     answer(text) → HTML d'une réponse de Caml (plusieurs lignes possibles) ; parseRepl(text) → [{ code, answer }].
     same(guess, answer) → 'exact' | 'value' | 'type' | 'error' | 'exn' | 'no' | 'empty' (réponse tapée).
     mount(root) : traite les blocs d'un conteneur (fait automatiquement à l'insertion).

   DÉROULEUR D'APPELS
     var tree = REV.caml.trace(function (self, n) { return n === 0 ? 1 : n * self(n - 1); }, [4],
       { show: function (n) { return 'fact ' + n; } });
       → { label: 'fact 4', args: [4], ret: 24, val: '24', kids: [ … ] }
       fn reçoit self (l'appel récursif, par lequel passe l'enregistrement) puis les arguments. Options : name
       ('f'), show(args…) étiquette d'un appel (défaut : 'f 3 (-1)'), fmt(ret) écriture de la valeur (défaut, à la
       Caml : 24, -3, true, "a", [1; 2] pour un tableau, (1, 2) pour REV.caml.tuple(1, 2)), limit (500 appels).
       Exception : throw REV.caml.exn('Invalid_argument', 'fact: n < 0') ; elle traverse les appels en attente.
       Un arbre écrit à la main convient aussi : { label: 'fib 2', val: '2', kids: [ … ] } (exn: 'Failure "…"').
     REV.caml.events(tree) → [{ type: 'call' | 'ret' | 'exn', node, depth, parent }] dans l'ordre d'évaluation.
     REV.caml.unroll(el, { tree, mode: 'stack' | 'tree', title, code, wait, say, dupes })
       Pas à pas (Précédent, Suivant, Tout dérouler, Recommencer), rien ne s'anime tout seul.
       stack : la pile d'appels, le plus récent en haut ; chaque appel en attente montre ce qu'il doit encore
         calculer : wait(node, vals) → texte Caml, vals = valeurs déjà rendues par ses sous-appels, par ex.
         wait: function (nd, v) { var n = nd.args[0]; return n === 0 ? '1' : n + ' * ' + (v.length ? v[0] : 'fact ' + (n - 1)); }
       tree : l'arbre des appels (SVG, défilement horizontal s'il est large), valeurs des appels terminés ;
         dupes: true entoure en pointillés un appel déjà calculé plus tôt avec la même étiquette (Fibonacci).
       code : code Caml affiché au-dessus ; say(ev, state) → HTML : remplace le commentaire d'une étape.

   FILTRAGE PAS À PAS
     REV.caml.matcher(el, { title, head: 'let grade a b =\n  match (a + b) / 2 with',
       cases: [{ pat: "x when x > 15", res: "'A'", test: function (v) { return v > 15 ? true : 'guard'; } }, …],
       inputs: [{ label: 'grade 12 14', v: 13, note: '(12 + 14) / 2 = 13', ans: "- : char = 'D'" }],
       versions: [{ label: 'Sujet', head, cases, ans: [réponses par entrée] }, …] })
       test(v) : true (le motif filtre), false (il ne filtre pas), 'guard' (il filtre, la garde est fausse).

   LIRE UN TYPE, APPLIQUER PAS À PAS
     REV.caml.apply(el, { name: 'average', params: [{ ty: 'int', arg: '2' }, { ty: 'int', arg: '3' }], res: 'float',
       answers: ['- : int -> int -> float = <fun>', '- : int -> float = <fun>', '- : float = 2.5'] })
       answers[k] : réponse de Caml à la phrase « average » suivie des k premiers arguments.

   Textes affichés : REV.t('français') ; l'anglais est déclaré ci-dessous (REV.i18n.add). */
(function () {
  'use strict';
  var R = window.REV, U = R.util, T = R.t;
  function esc(s) { return U.esc(String(s)); }
  R.i18n.add({
    'Boucle d’interaction de Caml': 'Caml interactive loop', 'Tout dévoiler': 'Reveal all', 'Tout masquer': 'Hide all',
    'Réponse de Caml': 'Caml answer', 'Ta réponse': 'Your answer', 'Ta réponse (ou laisse vide)': 'Your answer (or leave empty)',
    'Évaluer': 'Evaluate',
    'Exactement la réponse de Caml.': 'Exactly the Caml answer.',
    'La valeur est juste ; la réponse de Caml donne aussi le type.': 'The value is right; the Caml answer also gives the type.',
    'Le type est juste ; regarde la valeur.': 'The type is right; check the value.',
    'Oui : Caml refuse cette phrase. Lis son message.': 'Yes: Caml rejects this phrase. Read its message.',
    'Oui : une exception. Vérifie laquelle, et son message.': 'Yes: an exception. Check which one, and its message.',
    'Pas tout à fait : compare avec la réponse de Caml.': 'Not quite: compare with the Caml answer.',
    /* dérouleur */
    'Appels pas à pas': 'Calls step by step', 'Précédent': 'Previous', 'Suivant': 'Next', 'Tout dérouler': 'Run to the end',
    'Recommencer': 'Start again', 'étape {i} / {n}': 'step {i} / {n}', 'pile vide': 'empty stack',
    'fond de la pile': 'bottom of the stack', 'en cours': 'running', 'attend {c}': 'waits for {c}', 'renvoie {v}': 'returns {v}',
    'exception': 'exception', 'déjà calculé': 'already computed',
    'Pile : {n} · profondeur max : {d} · appels : {c} / {t}': 'Stack: {n} · max depth: {d} · calls: {c} / {t}',
    ' · dont {k} déjà calculés': ' · {k} of them already computed',
    'Appuie sur « Suivant » pour évaluer {c}.': 'Press “Next” to evaluate {c}.',
    'Appel de {c}. Ce n’est pas un cas d’arrêt : il faut d’abord {k}, et {c} reste en attente dans la pile.':
      'Call {c}. It is not a base case: {k} is needed first, and {c} waits in the stack.',
    'Appel de {c} : cas d’arrêt, la valeur est connue sans nouvel appel.': 'Call {c}: a base case, the value is known without any new call.',
    '{c} renvoie {v} à {p}, qui reprend son calcul.': '{c} returns {v} to {p}, which resumes its computation.',
    '{c} renvoie {v} : c’est le résultat. La pile est vide.': '{c} returns {v}: this is the result. The stack is empty.',
    '{c} déclenche {x}. L’exception traverse tous les appels en attente : aucun ne termine son calcul.':
      '{c} raises {x}. The exception goes through every waiting call: none of them finishes its computation.',
    ' Cet appel a déjà été fait plus tôt : le même calcul est refait en entier.': ' This call was already made earlier: the same computation is done again in full.',
    'Arbre des appels de {c}': 'Call tree of {c}', 'Pile des appels de {c}': 'Call stack of {c}',
    'En pointillés : un appel déjà calculé plus tôt.': 'Dashed: a call already computed earlier.',
    /* filtrage */
    'Filtrage pas à pas': 'Pattern matching step by step', 'Valeur filtrée': 'Matched value', 'Version': 'Version',
    'Motif suivant': 'Next pattern', 'Jusqu’au résultat': 'To the result',
    'filtre': 'matches', 'ne filtre pas': 'does not match', 'garde fausse': 'guard false', 'pas essayé': 'not tried',
    'Valeur filtrée : {v}.': 'Matched value: {v}.', 'Caml essaie les motifs dans l’ordre, de haut en bas.': 'Caml tries the patterns in order, from top to bottom.',
    '{v} ne filtre pas {p} : Caml passe au motif suivant.': '{v} does not match {p}: Caml moves on to the next pattern.',
    '{p} filtre {v}, mais la garde est fausse : Caml passe au motif suivant.': '{p} matches {v}, but the guard is false: Caml moves on to the next pattern.',
    '{p} filtre {v} : le résultat est {r}. Les motifs suivants ne sont pas essayés.': '{p} matches {v}: the result is {r}. The following patterns are not tried.',
    /* application partielle */
    'Lire un type, appliquer pas à pas': 'Read a type, apply step by step', 'Appliquer à {a}': 'Apply to {a}',
    'paramètre {n}': 'parameter {n}', 'résultat': 'result', 'reçoit {a}': 'receives {a}',
    '{f} attend {n} paramètres. Son type se lit de gauche à droite : un type par paramètre, et le dernier est celui du résultat.':
      '{f} expects {n} parameters. Its type reads from left to right: one type per parameter, and the last one is the type of the result.',
    '{e} est encore une fonction : il manque 1 paramètre. Son type est ce qui reste : {t}.': '{e} is still a function: 1 parameter is missing. Its type is what remains: {t}.',
    '{e} est encore une fonction : il manque {m} paramètres. Son type est ce qui reste : {t}.': '{e} is still a function: {m} parameters are missing. Its type is what remains: {t}.',
    'Tous les paramètres sont donnés : il reste {t}, le type du résultat, et Caml calcule la valeur.': 'All the parameters are given: {t} remains, the type of the result, and Caml computes the value.'
  });

  /* ------------------------------------------------------------------ jetons */
  var KW = {};
  ('and as assert begin class constraint do done downto else end exception external for fun function functor if in ' +
   'include inherit initializer lazy let match method module mutable new nonrec object of open or private rec sig ' +
   'struct then to try type val virtual when while with').split(' ').forEach(function (k) { KW[k] = 1; });
  var WOP = { mod: 1, land: 1, lor: 1, lxor: 1, lsl: 1, lsr: 1, asr: 1, not: 1 };
  var EXN = { failwith: 1, invalid_arg: 1, raise: 1 };
  var OPC = '!$%&*+-./:<=>?@^|~';
  var CHAR = /^'(?:[^\\'\n]|\\(?:[\\'"ntbr ]|\d{3}|x[0-9a-fA-F]{2}|o[0-3][0-7]{2}))'/;
  var NUM = /^(?:0[xX][0-9a-fA-F_]+|0[oO][0-7_]+|0[bB][01_]+|\d[\d_]*(?:\.[\d_]*)?(?:[eE][+-]?\d[\d_]*)?)/;

  function tokens(src, typeMode) {
    var s = String(src), n = s.length, i = 0, out = [], m, def = false;
    function push(t, v) { out.push({ t: t, v: v }); }
    while (i < n) {
      var c = s.charAt(i), rest = s.slice(i), j;
      if (/\s/.test(c)) { m = /^\s+/.exec(rest)[0]; push('sp', m); i += m.length; continue; }
      if (c === '(' && s.charAt(i + 1) === '*') {                       /* commentaire, éventuellement imbriqué */
        var d = 0; j = i;
        while (j < n) {
          if (s.charAt(j) === '(' && s.charAt(j + 1) === '*') { d++; j += 2; }
          else if (s.charAt(j) === '*' && s.charAt(j + 1) === ')') { d--; j += 2; if (!d) break; }
          else j++;
        }
        push('com', s.slice(i, j)); i = j; continue;
      }
      if (c === '"') {
        j = i + 1;
        while (j < n && s.charAt(j) !== '"') { if (s.charAt(j) === '\\') j++; j++; }
        j = Math.min(n, j + 1); push('str', s.slice(i, j)); i = j; def = false; continue;
      }
      if (c === "'") {
        if ((m = CHAR.exec(rest))) { push('str', m[0]); i += m[0].length; def = false; continue; }
        if ((m = /^'[a-z_][A-Za-z0-9_']*/.exec(rest))) { push('tv', m[0]); i += m[0].length; continue; }
      }
      if (/[0-9]/.test(c)) { m = NUM.exec(rest)[0]; push(typeMode ? 'ty' : 'num', m); i += m.length; def = false; continue; }
      if (/[a-z_]/.test(c)) {
        m = /^[a-z_][A-Za-z0-9_']*/.exec(rest)[0]; i += m.length;
        if (typeMode) { push(KW[m] ? 'kw' : 'ty', m); continue; }
        if (m === '_') push('ar', m);
        else if (KW[m]) { push('kw', m); def = m === 'let' || m === 'and' || (m === 'rec' && def); continue; }
        else if (m === 'true' || m === 'false') push('con', m);
        else if (WOP[m]) push('op', m);
        else if (EXN[m]) push('exn', m);
        else push(def ? 'def' : 'id', m);
        def = false; continue;
      }
      if (/[A-Z]/.test(c)) {
        m = /^[A-Z][A-Za-z0-9_']*/.exec(rest)[0]; i += m.length;
        push(s.charAt(i) === '.' && /[A-Za-z_(\[]/.test(s.charAt(i + 1)) ? 'mod' : typeMode ? 'ty' : 'con', m); def = false; continue;
      }
      if (c === '[' && s.charAt(i + 1) === ']') { push('con', '[]'); i += 2; def = false; continue; }
      if (c === '(' && s.charAt(i + 1) === ')') { push('con', '()'); i += 2; def = false; continue; }
      if (c === ';') { m = s.charAt(i + 1) === ';' ? ';;' : ';'; push(m === ';;' ? 'end' : 'p', m); i += m.length; def = false; continue; }
      if (OPC.indexOf(c) >= 0) {
        j = i; while (j < n && OPC.indexOf(s.charAt(j)) >= 0) j++;
        m = s.slice(i, j); i = j;
        push(typeMode ? 'ty' : m === '->' || m === '|' || m === '::' ? 'ar' : 'op', m); def = false; continue;
      }
      push('p', c); i++; def = false;
    }
    return out;
  }
  /* Tous les jetons sont des <code> (et les espaces restent dans un <code>) : la typographie du site
     (espaces insécables devant « : » ou entre un nombre et une unité) ne touche ainsi jamais au code. */
  function highlight(src, typeMode) {
    return tokens(src, typeMode).map(function (k) {
      return k.t === 'sp' || k.t === 'id' || k.t === 'p' ? esc(k.v) : '<code class="m-' + k.t + '">' + esc(k.v) + '</code>';
    }).join('');
  }

  /* code en ligne déjà coloré (marqué traité : mount() ne le recolore pas) */
  function mlc(src, typeMode) { return '<code class="ml" data-ml-done="1">' + highlight(src, typeMode) + '</code>'; }

  /* ------------------------------------------------------------------ réponses de Caml */
  var HEAD = /^(val |- :|Exception:|Error:|Warning |Characters |Line )/;
  function answerItems(text) {
    var items = [], cur = null;
    String(text).replace(/\s+$/, '').split('\n').forEach(function (l) {
      if (cur && !HEAD.test(l) && (/^\s/.test(l) || cur.k === 'warn')) { cur.text += '\n' + l; return; }
      var m = !HEAD.test(l) && /^(.+?)(- : .*)$/.exec(l);      /* affichage suivi de la réponse sur la même ligne */
      if (m) { items.push({ k: 'out', text: m[1], inl: true }); l = m[2]; }
      cur = { k: /^(val |- :)/.test(l) ? 'val' : /^Exception:/.test(l) ? 'exn' : /^Error:/.test(l) ? 'err' : /^Warning /.test(l) ? 'warn' : 'out', text: l };
      items.push(cur);
    });
    return items;
  }
  function splitVal(t) {
    var m = /^(?:val ([^\s:]+|\([^)]*\))|-) : ([\s\S]*?) =((?:[ \n])[\s\S]*)$/.exec(t);
    return m ? { name: m[1] || '-', type: m[2], value: m[3] } : null;
  }
  function valueHTML(v) {
    var m = /^(\s*)(<fun>|<abstr>|<poly>)$/.exec(v);
    return m ? esc(m[1]) + '<code class="m-fun">' + esc(m[2]) + '</code>' : highlight(v);
  }
  function itemHTML(it) {
    var t = it.text, m;
    if (it.k === 'val' && (m = splitVal(t))) {
      return '<code class="ml-a">' + (m.name === '-' ? '<code class="m-dash">-</code>' : '<code class="m-kw">val</code> <code class="m-def">' + esc(m.name) + '</code>') +
        ' : ' + highlight(m.type, true) + ' =' + valueHTML(m.value) + '</code>';
    }
    if (it.k === 'exn') return '<code class="ml-a ml-exn"><code class="m-lbl">Exception:</code>' + highlight(t.slice(10)) + '</code>';
    if (it.k === 'err') return '<code class="ml-a ml-err"><code class="m-lbl">Error:</code>' + esc(t.slice(6)) + '</code>';
    if (it.k === 'warn') {
      m = /^(Warning \d+(?: \[[^\]]*\])?:)([\s\S]*)$/.exec(t);
      return '<code class="ml-a ml-warn">' + (m ? '<code class="m-lbl">' + esc(m[1]) + '</code>' + esc(m[2]) : esc(t)) + '</code>';
    }
    return '<code class="ml-a ml-print' + (it.inl ? ' ml-inl' : '') + '">' + esc(t) + '</code>';
  }
  function answer(text) { return answerItems(text).map(itemHTML).join(''); }

  function parseRepl(text) {
    var items = [], cur = null, inCode = false;
    String(text).replace(/^\n+|\s+$/g, '').split('\n').forEach(function (l) {
      if (/^#( |$)/.test(l)) { cur = { code: l.replace(/^# ?/, ''), answer: '' }; items.push(cur); inCode = !/;;\s*$/.test(l); return; }
      if (!cur) { cur = { code: null, answer: l }; items.push(cur); return; }
      if (inCode) { cur.code += '\n' + l.replace(/^ {2}/, ''); if (/;;\s*$/.test(l)) inCode = false; return; }
      cur.answer += (cur.answer ? '\n' : '') + l;
    });
    return items;
  }

  /* comparaison souple d'une réponse tapée par l'élève */
  function norm(s) {
    return String(s).replace(/[’‘]/g, "'").replace(/[“”«»]/g, '"').replace(/ /g, ' ').replace(/\s+/g, ' ')
      .replace(/\s*(->|[:=,;()\[\]*|])\s*/g, '$1').replace(/^\s+|\s+$/g, '');
  }
  function same(guess, ans) {
    var g = norm(guess); if (!g) return 'empty';
    var items = answerItems(ans), main = null, all;
    items.forEach(function (it) { if (!main && it.k !== 'warn' && it.k !== 'out') main = it; });
    all = norm(items.filter(function (it) { return it.k !== 'warn'; }).map(function (it) { return it.text; }).join(' '));
    if (!main) return g === all ? 'exact' : 'no';
    if (g === all || g === norm(main.text)) return 'exact';
    if (main.k !== 'val' && g.replace(/\.$/, '') === norm(main.text).replace(/\.$/, '')) return 'exact';
    if (main.k === 'val') {
      var p = splitVal(main.text);
      if (p) {
        if (g === norm(p.type + ' = ' + p.value) || g === norm(': ' + p.type + ' = ' + p.value)) return 'exact';
        if (g === norm(p.value)) return 'value';
        if (g === norm(p.type) || g === norm(p.name + ' : ' + p.type)) return 'type';
      }
    }
    if (main.k === 'err' && /err/i.test(g)) return 'error';
    if (main.k === 'exn') { var c = /^Exception:\s*(\w+)/.exec(main.text); if ((c && g.indexOf(c[1]) >= 0) || /exception|exn/i.test(g)) return 'exn'; }
    return 'no';
  }
  var VERDICT = {
    exact: ['ok', '✓ ', 'Exactement la réponse de Caml.'],
    value: ['mid', '', 'La valeur est juste ; la réponse de Caml donne aussi le type.'],
    type: ['mid', '', 'Le type est juste ; regarde la valeur.'],
    error: ['ok', '✓ ', 'Oui : Caml refuse cette phrase. Lis son message.'],
    exn: ['mid', '', 'Oui : une exception. Vérifie laquelle, et son message.'],
    no: ['no', '', 'Pas tout à fait : compare avec la réponse de Caml.']
  };

  /* ------------------------------------------------------------------ blocs de la page */
  var uid = 0;
  function mountRepl(pre) {
    if (pre.getAttribute('data-ml-done')) return;
    pre.setAttribute('data-ml-done', '1');
    var mode = pre.getAttribute('data-mode') || 'show', title = pre.getAttribute('data-title');
    var items = parseRepl(pre.textContent), hide = mode === 'reveal' || mode === 'guess';
    var box = document.createElement('div');
    box.className = 'ml-repl' + (hide ? ' ml-' + mode : '') + (pre.className ? ' ' + pre.className : '');
    if (pre.id) box.id = pre.id;
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', pre.getAttribute('aria-label') || title || T('Boucle d’interaction de Caml'));
    var h = '';
    if (title || hide) {
      h += '<div class="ml-head"><span class="ml-t">' + esc(title || T('Boucle d’interaction de Caml')) + '</span>' +
        (hide ? '<button type="button" class="ml-all" aria-pressed="false">' + T('Tout dévoiler') + '</button>' : '') + '</div>';
    }
    items.forEach(function (it) {
      var id = 'ml-g' + (++uid);
      h += '<div class="ml-ph">';
      if (it.code != null) h += '<div class="ml-in"><span class="ml-pr" aria-hidden="true">#</span><pre class="ml-code"><code>' + highlight(it.code) + '</code></pre></div>';
      if (it.answer) {
        h += '<div class="ml-out">';
        if (mode === 'reveal') h += '<div class="ml-ask"><button type="button" class="ml-btn" data-show>' + T('Réponse de Caml') + '</button></div>';
        if (mode === 'guess') {
          h += '<div class="ml-ask"><label class="sr-only" for="' + id + '">' + T('Ta réponse') + '</label>' +
            '<input id="' + id + '" class="ml-guess" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="' + esc(T('Ta réponse (ou laisse vide)')) + '">' +
            '<button type="button" class="ml-btn" data-cmp>' + T('Évaluer') + '</button><span class="ml-verdict" aria-live="polite"></span></div>';
        }
        h += '<div class="ml-ans"' + (hide ? ' hidden' : '') + '>' + answer(it.answer) + '</div></div>';
      }
      h += '</div>';
    });
    box.innerHTML = h;
    pre.parentNode.replaceChild(box, pre);
    if (!hide) return box;
    var phs = U.$$('.ml-ph', box), all = box.querySelector('.ml-all');
    function show(ph, on) {
      var a = ph.querySelector('.ml-ans'), b = ph.querySelector('[data-show]');
      if (a) a.hidden = !on;
      if (b) b.hidden = on;
    }
    phs.forEach(function (ph, k) {
      var it = items[k], b = ph.querySelector('[data-show]'), c = ph.querySelector('[data-cmp]'), inp = ph.querySelector('.ml-guess');
      if (b) b.addEventListener('click', function () { show(ph, true); });
      if (c) {
        var go = function () {
          var r = same(inp.value, it.answer), v = ph.querySelector('.ml-verdict');
          if (r === 'empty') v.innerHTML = '';
          else { var d = VERDICT[r]; v.className = 'ml-verdict v-' + d[0]; v.innerHTML = d[1] + T(d[2]); }
          show(ph, true);
        };
        c.addEventListener('click', go);
        inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); go(); } });
      }
    });
    if (all) all.addEventListener('click', function () {
      var on = all.getAttribute('aria-pressed') !== 'true';
      all.setAttribute('aria-pressed', String(on));
      all.textContent = on ? T('Tout masquer') : T('Tout dévoiler');
      phs.forEach(function (ph) { show(ph, on); });
    });
    return box;
  }
  function mountCode(el) {
    if (el.getAttribute('data-ml-done')) return;
    el.setAttribute('data-ml-done', '1');
    var src = el.textContent.replace(/^\n+|\s+$/g, '');
    if (el.tagName === 'PRE') { el.classList.add('ml-block'); el.innerHTML = '<code>' + highlight(src) + '</code>'; }
    else el.innerHTML = highlight(src);
  }
  function mountAns(el) {
    if (el.getAttribute('data-ml-done')) return;
    el.setAttribute('data-ml-done', '1');
    el.classList.add('ml-ansin');
    el.innerHTML = answer(el.textContent.replace(/^\n+|\s+$/g, ''));
  }
  var SEL = 'pre[data-ml-repl],pre[data-ml],code.ml,code[data-ml-ans]';
  function mount(root) {
    root = root || document.body;
    if (!root || root.nodeType !== 1) return;
    var list = root.matches && root.matches(SEL) ? [root] : [];
    list = list.concat(U.$$(SEL, root));
    list.forEach(function (el) {
      if (el.getAttribute('data-ml-done')) return;
      if (el.hasAttribute('data-ml-repl')) mountRepl(el);
      else if (el.hasAttribute('data-ml-ans')) mountAns(el);
      else mountCode(el);
    });
  }

  /* ------------------------------------------------------------------ numéros de parties */
  /* Une trace d'appels indentée : la partie n en montre n lignes, chacune un cran plus à droite, la dernière en orange. */
  function callsSVG(n) {
    n = Math.max(1, Math.min(8, n | 0));
    var s = '<svg viewBox="0 0 30 26" aria-hidden="true" focusable="false">';
    for (var k = 0; k < n; k++) {
      var x = 1 + k * 2.55, y = 1.5 + k * 3.1, now = k === n - 1;
      s += '<rect x="' + x.toFixed(2) + '" y="' + y.toFixed(2) + '" width="3" height="2" rx="1"' + (now ? ' class="now"' : '') + '/>' +
        '<rect x="' + (x + 4.2).toFixed(2) + '" y="' + y.toFixed(2) + '" width="' + (now ? 6.6 : 5.4) + '" height="2" rx="1"' + (now ? ' class="now"' : ' class="b"') + '/>';
    }
    return s + '</svg>';
  }

  /* ------------------------------------------------------------------ dérouleur d'appels */
  function CamlExn(name, msg) { this.name = name; this.msg = msg; }
  CamlExn.prototype.toString = function () { return this.name + (this.msg != null ? ' ' + JSON.stringify(String(this.msg)) : ''); };
  function exn(name, msg) { return new CamlExn(name, msg); }
  function tuple() { return { tuple: Array.prototype.slice.call(arguments) }; }
  function fmt(v) {
    if (typeof v === 'number') return String(v);
    if (typeof v === 'boolean') return String(v);
    if (typeof v === 'string') return JSON.stringify(v);
    if (Array.isArray(v)) return '[' + v.map(fmt).join('; ') + ']';
    if (v && v.tuple) return '(' + v.tuple.map(fmt).join(', ') + ')';
    if (v === undefined || v === null) return '()';
    return String(v);
  }
  function argText(v) { var s = fmt(v); return typeof v === 'number' && v < 0 ? '(' + s + ')' : s; }
  function trace(fn, args, opts) {
    opts = opts || {};
    var count = 0, limit = opts.limit || 500, name = opts.name || 'f', show = opts.show, f = opts.fmt || fmt;
    function call(a, depth) {
      if (++count > limit) throw new Error('REV.caml.trace : plus de ' + limit + ' appels');
      var node = { label: show ? show.apply(null, a) : name + ' ' + a.map(argText).join(' '), args: a, kids: [], depth: depth };
      var self = function () {
        var k = call(Array.prototype.slice.call(arguments), depth + 1);
        node.kids.push(k);
        if (k.exn) throw k.exn;
        return k.ret;
      };
      try { node.ret = fn.apply(null, [self].concat(a)); node.val = f(node.ret); }
      catch (e) { if (e instanceof CamlExn) node.exn = e; else throw e; }
      return node;
    }
    return call(args || [], 0);
  }
  function events(tree) {
    var ev = [];
    (function walk(n, d, p) {
      ev.push({ type: 'call', node: n, depth: d, parent: p });
      (n.kids || []).forEach(function (k) { walk(k, d + 1, n); });
      ev.push({ type: n.exn ? 'exn' : 'ret', node: n, depth: d, parent: p });
    })(tree, 0, null);
    return ev;
  }
  function exnText(n) { return n.exn ? (typeof n.exn === 'string' ? n.exn : String(n.exn)) : ''; }
  /* état après les i premiers événements : pile, valeurs rendues, appels terminés */
  function stateAt(ev, i, dupes) {
    var st = { stack: [], vals: {}, done: {}, called: {}, last: i > 0 ? ev[i - 1] : null, maxDepth: 0, calls: 0, dup: {}, ndup: 0 };
    var seen = {};
    for (var j = 0; j < i; j++) {
      var e = ev[j], id = e.node._id;
      if (e.type === 'call') {
        st.stack.push(e.node); st.called[id] = true; st.vals[id] = []; st.calls++;
        st.maxDepth = Math.max(st.maxDepth, st.stack.length);
        if (dupes && seen[e.node.label]) { st.dup[id] = true; st.ndup++; }
      } else {
        st.stack.pop(); st.done[id] = e.type;
        if (e.type === 'ret') seen[e.node.label] = true;
        if (e.parent) st.vals[e.parent._id].push(e.type === 'ret' ? e.node.val : null);
      }
    }
    return st;
  }
  function codeHTML(s) { return mlc(s); }

  function unroll(el, o) {
    if (!el) return null;
    var tree = o.tree, mode = o.mode === 'tree' ? 'tree' : 'stack', n = 0, all = [];
    (function walk(nd) { nd._id = n++; all.push(nd); (nd.kids || []).forEach(walk); })(tree);
    var ev = events(tree), i = 0;
    var title = o.title || T(mode === 'tree' ? 'Arbre des appels de {c}' : 'Pile des appels de {c}', { c: tree.label });
    el.classList.add('bench', 'cu');
    el.innerHTML = '<div class="bench-head"><span class="bh-t">' + esc(title) + '</span><span class="cu-count" aria-hidden="true"></span></div>' +
      '<div class="bench-body">' + (o.code ? '<pre class="ml-block cu-code"><code>' + highlight(o.code) + '</code></pre>' : '') +
      '<div class="cu-view"></div><p class="readout cu-say" aria-live="polite"></p><p class="cu-meta"></p></div>' +
      '<div class="ctrls"><div class="row">' +
      '<button type="button" class="btn" data-act="prev">' + T('Précédent') + '</button>' +
      '<button type="button" class="btn primary" data-act="next">' + T('Suivant') + '</button>' +
      '<button type="button" class="btn" data-act="end">' + T('Tout dérouler') + '</button>' +
      '<button type="button" class="btn" data-act="reset">' + T('Recommencer') + '</button></div></div>';
    var view = el.querySelector('.cu-view'), say = el.querySelector('.cu-say'), meta = el.querySelector('.cu-meta'), cnt = el.querySelector('.cu-count');
    var lay = mode === 'tree' ? layout(tree) : null;
    function waitText(nd, st) {
      if (o.wait) { var w = o.wait(nd, st.vals[nd._id] || []); return w ? mlc(w) : ''; }
      var kids = nd.kids || [], k = (st.vals[nd._id] || []).length;
      return k < kids.length ? T('attend {c}', { c: mlc(kids[k].label) }) : '';
    }
    function sayText(st) {
      var e = st.last;
      if (o.say) { var s = o.say(e, st, i); if (s != null) return s; }
      if (!e) return T('Appuie sur « Suivant » pour évaluer {c}.', { c: codeHTML(tree.label) });
      var c = codeHTML(e.node.label);
      if (e.type === 'call') {
        var t = e.node.kids && e.node.kids.length ? T('Appel de {c}. Ce n’est pas un cas d’arrêt : il faut d’abord {k}, et {c} reste en attente dans la pile.', { c: c, k: codeHTML(e.node.kids[0].label) })
          : T('Appel de {c} : cas d’arrêt, la valeur est connue sans nouvel appel.', { c: c });
        if (st.dup[e.node._id]) t += T(' Cet appel a déjà été fait plus tôt : le même calcul est refait en entier.');
        return t;
      }
      if (e.type === 'exn') return T('{c} déclenche {x}. L’exception traverse tous les appels en attente : aucun ne termine son calcul.', { c: c, x: '<code class="ml-ansin">' + answer('Exception: ' + exnText(e.node) + '.') + '</code>' });
      var v = '<b class="cu-v">' + esc(e.node.val) + '</b>';
      return e.parent ? T('{c} renvoie {v} à {p}, qui reprend son calcul.', { c: c, v: v, p: codeHTML(e.parent.label) })
        : T('{c} renvoie {v} : c’est le résultat. La pile est vide.', { c: c, v: v });
    }
    function drawStack(st) {
      var h = '<div class="cu-stack">', e = st.last;
      if (e && e.type !== 'call') {
        h += '<div class="cu-frame cu-gone' + (e.type === 'exn' ? ' cu-x' : '') + '">' + mlc(e.node.label) + '<span class="cu-w">' +
          (e.type === 'exn' ? esc(T('exception')) : esc(T('renvoie {v}', { v: e.node.val }))) + '</span></div>';
      }
      for (var k = st.stack.length - 1; k >= 0; k--) {
        var nd = st.stack[k], top = k === st.stack.length - 1, w = waitText(nd, st);
        h += '<div class="cu-frame' + (top ? ' cu-top' : '') + (st.dup[nd._id] ? ' cu-dup' : '') + '">' + mlc(nd.label) +
          '<span class="cu-w">' + (w || (top ? esc(T('en cours')) : '')) + '</span></div>';
      }
      if (!st.stack.length) h += '<div class="cu-empty">' + esc(T('pile vide')) + '</div>';
      return h + '<div class="cu-base">' + esc(T('fond de la pile')) + '</div></div>';
    }
    function drawTree(st) {
      var L = lay, top = st.stack.length ? st.stack[st.stack.length - 1] : null;
      var s = '<svg class="cu-svg" width="' + L.w + '" height="' + L.h + '" viewBox="0 0 ' + L.w + ' ' + L.h + '" role="img" aria-label="' + esc(title) + '">';
      all.forEach(function (nd) {
        (nd.kids || []).forEach(function (k) {
          if (!st.called[k._id]) return;
          s += '<path class="cu-edge" d="M' + nd._px + ' ' + (nd._py + L.bh / 2) + ' L' + k._px + ' ' + (k._py - L.bh / 2) + '"/>';
        });
      });
      all.forEach(function (nd) {
        if (!st.called[nd._id]) return;
        var d = st.done[nd._id], cls = 'cu-node' + (nd === top ? ' cu-top' : d === 'ret' ? ' cu-done' : d === 'exn' ? ' cu-x' : ' cu-wait') + (st.dup[nd._id] ? ' cu-dup' : '');
        var x = nd._px - L.bw / 2, y = nd._py - L.bh / 2;
        s += '<g class="' + cls + '"><rect x="' + x + '" y="' + y + '" width="' + L.bw + '" height="' + L.bh + '" rx="8"/>' +
          '<text x="' + nd._px + '" y="' + (nd._py - (d ? 3 : -4)) + '" text-anchor="middle">' + esc(nd.label) + '</text>' +
          (d ? '<text class="cu-tv" x="' + nd._px + '" y="' + (nd._py + 13) + '" text-anchor="middle">' + esc(d === 'ret' ? '= ' + nd.val : T('exception')) + '</text>' : '') + '</g>';
      });
      return '<div class="cu-tree">' + s + '</svg></div>' + (o.dupes ? '<p class="cu-legend">' + esc(T('En pointillés : un appel déjà calculé plus tôt.')) + '</p>' : '');
    }
    function paint() {
      var st = stateAt(ev, i, o.dupes);
      view.innerHTML = mode === 'tree' ? drawTree(st) : drawStack(st);
      say.innerHTML = sayText(st);
      meta.textContent = T('Pile : {n} · profondeur max : {d} · appels : {c} / {t}', { n: st.stack.length, d: st.maxDepth, c: st.calls, t: all.length }) +
        (o.dupes && st.ndup ? T(' · dont {k} déjà calculés', { k: st.ndup }) : '');
      cnt.textContent = T('étape {i} / {n}', { i: i, n: ev.length });
      el.querySelector('[data-act="prev"]').disabled = i === 0;
      el.querySelector('[data-act="next"]').disabled = el.querySelector('[data-act="end"]').disabled = i === ev.length;
    }
    el.querySelector('.ctrls').addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]'); if (!b) return;
      var a = b.getAttribute('data-act');
      i = a === 'prev' ? Math.max(0, i - 1) : a === 'next' ? Math.min(ev.length, i + 1) : a === 'end' ? ev.length : 0;
      paint();
    });
    paint();
    return { events: ev, go: function (k) { i = Math.max(0, Math.min(ev.length, k)); paint(); }, step: function () { return i; } };
  }
  /* placement de l'arbre : une colonne par feuille, un parent au milieu de ses enfants */
  function layout(tree) {
    var leaves = 0, depth = 0, maxLen = 4;
    (function walk(nd, d) {
      nd._d = d; depth = Math.max(depth, d);
      maxLen = Math.max(maxLen, String(nd.label).length, nd.val != null ? String(nd.val).length + 2 : 0);
      if (!nd.kids || !nd.kids.length) nd._x = leaves++;
      else { nd.kids.forEach(function (k) { walk(k, d + 1); }); nd._x = (nd.kids[0]._x + nd.kids[nd.kids.length - 1]._x) / 2; }
    })(tree, 0);
    var bw = Math.round(maxLen * 7.4 + 20), slot = bw + 12, bh = 38, gap = 62, pad = 8;
    (function place(nd) { nd._px = pad + nd._x * slot + slot / 2; nd._py = pad + bh / 2 + nd._d * gap; (nd.kids || []).forEach(place); })(tree);
    return { w: pad * 2 + leaves * slot, h: pad * 2 + bh + depth * gap, bw: bw, bh: bh };
  }

  /* ------------------------------------------------------------------ filtrage pas à pas */
  function matcher(el, o) {
    if (!el) return null;
    var versions = o.versions || [{ label: '', head: o.head, cases: o.cases, ans: (o.inputs || []).map(function (x) { return x.ans; }) }];
    var inputs = o.inputs || [], vi = 0, ii = 0, k = 0;
    el.classList.add('bench', 'mm');
    el.innerHTML = '<div class="bench-head"><span class="bh-t">' + esc(o.title || T('Filtrage pas à pas')) + '</span></div>' +
      '<div class="bench-body">' +
      (versions.length > 1 ? '<div class="row" role="group" aria-label="' + esc(T('Version')) + '">' + versions.map(function (v, j) {
        return '<button type="button" class="chip-btn" data-v="' + j + '">' + esc(v.label) + '</button>'; }).join('') + '</div>' : '') +
      '<div class="row" role="group" aria-label="' + esc(T('Valeur filtrée')) + '">' + inputs.map(function (x, j) {
        return '<button type="button" class="chip-btn" data-i="' + j + '">' + mlc(x.label) + '</button>'; }).join('') + '</div>' +
      '<div class="mm-code"></div><p class="readout mm-say" aria-live="polite"></p><div class="mm-ans" hidden></div></div>' +
      '<div class="ctrls"><div class="row"><button type="button" class="btn primary" data-act="next">' + T('Motif suivant') + '</button>' +
      '<button type="button" class="btn" data-act="end">' + T('Jusqu’au résultat') + '</button>' +
      '<button type="button" class="btn" data-act="reset">' + T('Recommencer') + '</button></div></div>';
    var code = el.querySelector('.mm-code'), sayEl = el.querySelector('.mm-say'), ansEl = el.querySelector('.mm-ans');
    function results() {
      var v = inputs[ii].v, out = [], hit = -1;
      versions[vi].cases.forEach(function (c, j) {
        if (hit >= 0) { out.push('skip'); return; }
        var r = c.test(v); r = r === true ? 'yes' : r === 'guard' ? 'guard' : 'no';
        out.push(r); if (r === 'yes') hit = j;
      });
      return { st: out, hit: hit };
    }
    var LBL = { yes: 'filtre', no: 'ne filtre pas', guard: 'garde fausse', skip: 'pas essayé' };
    function paint() {
      var V = versions[vi], r = results(), x = inputs[ii], last = r.hit >= 0 ? r.hit + 1 : V.cases.length;
      var h = '<pre class="ml-block mm-head"><code>' + highlight(V.head) + '</code></pre><ol class="mm-cases">';
      V.cases.forEach(function (c, j) {
        var st = j < k ? r.st[j] : (k >= last && r.st[j] === 'skip' ? 'skip' : 'todo');
        h += '<li class="mm-case" data-st="' + st + '"><pre class="ml-block"><code>' + highlight((j ? '| ' : '  ') + c.pat + ' -> ' + c.res) + '</code></pre>' +
          '<span class="mm-st">' + (st === 'todo' ? '' : (st === 'yes' ? '✓ ' : st === 'skip' ? '· ' : '✗ ') + esc(T(LBL[st]))) + '</span></li>';
      });
      code.innerHTML = h + '</ol>';
      var v = mlc(String(x.v));
      if (k === 0) sayEl.innerHTML = T('Valeur filtrée : {v}.', { v: v }) + (x.note ? ' <span class="muted">(' + mlc(x.note) + ')</span>' : '') + ' ' + T('Caml essaie les motifs dans l’ordre, de haut en bas.');
      else {
        var c = V.cases[k - 1], s = r.st[k - 1], p = mlc(c.pat);
        sayEl.innerHTML = s === 'yes' ? T('{p} filtre {v} : le résultat est {r}. Les motifs suivants ne sont pas essayés.', { p: p, v: v, r: mlc(c.res) })
          : s === 'guard' ? T('{p} filtre {v}, mais la garde est fausse : Caml passe au motif suivant.', { p: p, v: v })
          : T('{v} ne filtre pas {p} : Caml passe au motif suivant.', { p: p, v: v });
      }
      var a = V.ans && V.ans[ii];
      ansEl.hidden = !(k >= last && a);
      ansEl.innerHTML = a ? '<div class="ml-repl"><div class="ml-ph"><div class="ml-in"><span class="ml-pr" aria-hidden="true">#</span><pre class="ml-code"><code>' + highlight(x.label + ' ;;') + '</code></pre></div>' +
        '<div class="ml-out"><div class="ml-ans">' + answer(a) + '</div></div></div></div>' : '';
      U.$$('[data-v]', el).forEach(function (b) { b.setAttribute('aria-pressed', String(+b.getAttribute('data-v') === vi)); });
      U.$$('[data-i]', el).forEach(function (b) { b.setAttribute('aria-pressed', String(+b.getAttribute('data-i') === ii)); });
      el.querySelector('[data-act="next"]').disabled = el.querySelector('[data-act="end"]').disabled = k >= last;
    }
    el.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b || !el.contains(b)) return;
      var last = (function () { var r = results(); return r.hit >= 0 ? r.hit + 1 : versions[vi].cases.length; })();
      if (b.hasAttribute('data-v')) { vi = +b.getAttribute('data-v'); k = 0; }
      else if (b.hasAttribute('data-i')) { ii = +b.getAttribute('data-i'); k = 0; }
      else if (b.getAttribute('data-act') === 'next') k = Math.min(last, k + 1);
      else if (b.getAttribute('data-act') === 'end') k = last;
      else if (b.getAttribute('data-act') === 'reset') k = 0;
      else return;
      paint();
    });
    paint();
    return { results: function (v, i) { vi = v || 0; ii = i || 0; return results(); } };
  }

  /* ------------------------------------------------------------------ lire un type, appliquer pas à pas */
  function apply(el, o) {
    if (!el) return null;
    var P = o.params, n = P.length, k = 0;
    el.classList.add('bench', 'ap');
    el.innerHTML = '<div class="bench-head"><span class="bh-t">' + esc(o.title || T('Lire un type, appliquer pas à pas')) + '</span></div>' +
      '<div class="bench-body"><div class="ap-expr"></div><div class="ap-type" aria-hidden="true"></div><p class="readout ap-say" aria-live="polite"></p></div>' +
      '<div class="ctrls"><div class="row"><button type="button" class="btn primary" data-act="next"></button><button type="button" class="btn" data-act="reset">' + T('Recommencer') + '</button></div></div>';
    var ex = el.querySelector('.ap-expr'), ty = el.querySelector('.ap-type'), sayEl = el.querySelector('.ap-say');
    function rest() { return P.slice(k).map(function (p) { return p.ty; }).concat([o.res]).join(' -> '); }
    function paint() {
      var e = o.name + (k ? ' ' + P.slice(0, k).map(function (p) { return p.arg; }).join(' ') : '');
      ex.innerHTML = '<div class="ml-repl"><div class="ml-ph"><div class="ml-in"><span class="ml-pr" aria-hidden="true">#</span><pre class="ml-code"><code>' + highlight(e + ' ;;') + '</code></pre></div>' +
        '<div class="ml-out"><div class="ml-ans">' + answer(o.answers[k]) + '</div></div></div></div>';
      var h = '';
      P.forEach(function (p, j) {
        h += '<span class="ap-seg' + (j < k ? ' used' : j === k ? ' next' : '') + '"><code class="m-ty">' + esc(p.ty) + '</code><small>' +
          esc(j < k ? T('reçoit {a}', { a: p.arg }) : T('paramètre {n}', { n: j + 1 })) + '</small></span><span class="ap-arr' + (j < k ? ' used' : '') + '">-&gt;</span>';
      });
      ty.innerHTML = h + '<span class="ap-seg res' + (k === n ? ' next' : '') + '"><code class="m-ty">' + esc(o.res) + '</code><small>' + esc(T('résultat')) + '</small></span>';
      var t = mlc(rest(), true);
      sayEl.innerHTML = k === 0 ? T('{f} attend {n} paramètres. Son type se lit de gauche à droite : un type par paramètre, et le dernier est celui du résultat.', { f: mlc(o.name), n: n })
        : k < n ? T(n - k === 1 ? '{e} est encore une fonction : il manque 1 paramètre. Son type est ce qui reste : {t}.' : '{e} est encore une fonction : il manque {m} paramètres. Son type est ce qui reste : {t}.', { e: mlc(e), m: n - k, t: t })
        : T('Tous les paramètres sont donnés : il reste {t}, le type du résultat, et Caml calcule la valeur.', { t: t });
      var b = el.querySelector('[data-act="next"]');
      b.disabled = k >= n;
      b.innerHTML = T('Appliquer à {a}', { a: mlc(P[Math.min(k, n - 1)].arg) });
    }
    el.querySelector('.ctrls').addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]'); if (!b) return;
      k = b.getAttribute('data-act') === 'next' ? Math.min(n, k + 1) : 0;
      paint();
    });
    paint();
    return { go: function (j) { k = Math.max(0, Math.min(n, j)); paint(); } };
  }

  /* ------------------------------------------------------------------ page */
  function init() {
    U.$$('.calls[data-n]').forEach(function (el) { el.innerHTML = callsSVG(+el.dataset.n); el.setAttribute('aria-hidden', 'true'); });
    mount(document.body);
    /* code ajouté plus tard (cartes de QCM, corrigés dévoilés…) */
    if (window.MutationObserver) new MutationObserver(function (list) {
      for (var a = 0; a < list.length; a++) for (var b = 0; b < list[a].addedNodes.length; b++) {
        var nd = list[a].addedNodes[b];
        if (nd.nodeType === 1) mount(nd);
      }
    }).observe(document.body, { childList: true, subtree: true });
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
    U.$$('[data-check-ref]').forEach(function (el) {
      var ref = el.getAttribute('data-check-ref'), n = +el.getAttribute('data-n') || 3;
      var ids = R.quiz ? R.quiz.bank().filter(function (q) { return q.ref === ref; }).slice(0, n).map(function (q) { return q.id; }) : [];
      if (ids.length) R.quiz.mountCheck(el, ids, el.getAttribute('data-title')); else el.hidden = true;
    });
    R.wireDoneButtons();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  R.caml = {
    tokens: tokens, highlight: highlight, code: mlc, answer: answer, answerItems: answerItems, parseRepl: parseRepl, same: same, norm: norm,
    mount: mount, callsSVG: callsSVG,
    trace: trace, events: events, stateAt: stateAt, unroll: unroll, exn: exn, tuple: tuple, fmt: fmt,
    matcher: matcher, apply: apply, layout: layout
  };
})();
