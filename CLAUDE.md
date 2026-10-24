# Révisions S1 — notes pour les sessions suivantes

Site statique de révision des partiels EPITA S1 (promo 2031). Vanilla HTML/CSS/JS, **aucun build**, compatible
`file://` (scripts classiques, pas de modules ES ni de `fetch` de données) et GitHub Pages (chemins relatifs).

## Architecture

- Chaque page charge `assets/css/shell.css` puis sa propre feuille, et `assets/js/core.js` **dans le `<head>`**
  (thème appliqué avant l’affichage). La barre de navigation est injectée dans `<div id="shell"></div>`.
- `core.js` expose `window.REV` : `root`/`url()` (chemins absolus calculés depuis l’emplacement de core.js),
  `subjects` (registre des matières : id, nom, statut `ready`/`soon`, chapitres et nombre de parties),
  `progress` (parties comprises, clé `<matière>:<chapitre>:s<N>`), `qcm` (boîtes de Leitner : 1, 2, 4, 8, 16 jours),
  `exo` (exercices réussis / à revoir, clé `<matière>-<id>`), `exams` (date du partiel saisie par l’élève), `theme`.
  Tout est stocké sous la clé `localStorage` `rev-s1:v1`, toujours dans un try/catch.
- `circuit.js` : `REV.circuit(spec)` dessine un schéma SVG (convention française du cours : source de tension =
  rond traversé par le fil, source de courant = rond barré en travers). Documentation en tête du fichier.
- `qcm-engine.js` : `REV.quiz.Card(question, opts)` et `REV.quiz.mountCheck(el, ids)` (vérifications de fin de
  section dans les cours : `<div data-check="id1,id2"></div>`).
- `spec.js` : `REV.spec(texte, { roles, hl })` met en forme une spécification de type abstrait (mots-clés seuls sur
  leur ligne : types, utilise, opérations, préconditions, axiomes, avec) ; `<pre data-spec data-roles="1">` dans une
  page. Une question de QCM peut avoir `fig: { code: '…' }`.
- `taa.js` (pages TAA) : `R.taa.term` (parse, show), `R.taa.rewrite` (jeux d’axiomes PILE, FILE, LISTE, BOOL,
  ENSEMBLE, extensibles ; `trace` donne les étapes), bancs `stepper`, `stackBench`, `queueBench`, `ranksBench`,
  `sorter`, et `<div data-check-ref="taa/cours-1-types.html#s2" data-n="3">` (questions de la banque qui renvoient
  à cette partie). Numéros de parties : `<span class="plates" data-n="3">`.
- `meca.js` (pages de physique) : comportements des pages, et outils de dessin documentés en tête du fichier :
  `R.meca.plot({…})` (repère, courbes, chronophotographie, vecteurs aux couleurs fixes position / vitesse /
  accélération / force), `R.meca.mount`, `R.meca.launcher` (tir), `R.meca.linked` (x, v, a liés), `R.meca.calc`.
  Thème `physique.css` : « plaque chronophotographique » ; vecteurs dans le texte : `<var class="vec kv">v</var>`.
- `caml.js` (pages Caml, API documentée en tête du fichier) : coloration (`<pre data-ml>`, `<code class="ml">`,
  réponse en ligne `<code data-ml-ans>`), boucle d’interaction `<pre data-ml-repl data-mode="show|reveal|guess">`
  (`# phrase ;;` puis la réponse de Caml), `R.caml.unroll` (pile ou arbre des appels, à partir de `R.caml.trace`),
  `R.caml.matcher` (filtrage pas à pas), `R.caml.apply` (lire un type, application partielle). Tout bloc ajouté par
  script est coloré (MutationObserver). Thème `caml.css` : la boucle d’interaction, famille Recursive.
- `archi.js` (pages d’Archi, API documentée en tête du fichier) : arithmétique exacte `R.archi` (BigInt et fractions,
  jamais de flottants JS : `toBase`, `convert`, `packs`, `addCols`, `subCols`, `mulCols`, `divCols`, `encode`,
  `decodeS`, `addN`, `subN`, `ieeeEncode`, `ieeeDecode`, `fmt` / `num` : virgule en français, point en anglais), et
  outils déclaratifs `<div data-archi="posed|divs|mults|groups|converter|drill|place|register|wheel|ieee"
  data-opts='{…}'>`, montés aussi quand ils sont ajoutés par script. Thème `archi.css` : fiche technique de
  processeur (Intel One Mono pour les nombres).
- `mathrender.js` + `assets/vendor/katex/` (KaTeX 0.16.11 en copie locale, polices woff2) : `\( … \)` en ligne,
  `\[ … \]` en bloc, rendus au chargement et pour tout contenu ajouté par script (jamais le texte d'un `script` ou
  d'un `style`, sinon l'observateur boucle) ; `REV.math.render(el)`, `tex(src)`, macros du site (`\R`, `\card`, `\P`,
  `\E`, `\V`, `\ent{a}{b}`). Une page qui affiche des formules (maths, QCM) charge `mathrender.js` seul.
- `maths.js` (pages de maths, API en tête du fichier) : fractions exactes en BigInt, et outils `data-maths="truth|negate|
  venn|sagittal|tree|law|pascal|choose|curve" data-opts='{…}'` (table de vérité, négation pas à pas, Venn, sagittal,
  arbre pondéré et Bayes, loi et binomiale, triangle de Pascal, « quelle formule ? », courbe avec images directes et
  réciproques exactes). Thème `maths.css` : copie double à carreaux en clair, tableau noir en sombre.

## Deux langues

- Chaque page `X.html` a une jumelle anglaise `X.en.html` (même dossier, mêmes `id`, `<html lang="en">`) pour la
  section anglophone de la classe. **Toute modification de contenu se fait dans les deux pages** (et dans
  `data/en/…` pour les données). Le bouton FR | EN (`core.js`) mène à la jumelle et retient le choix
  (`rev-s1:lang`) ; une page ouverte dans l’autre langue redirige vers sa jumelle (`?lang=keep` l’empêche).
- Sur une page anglaise, les liens internes `….html` sont réécrits en `….en.html` (aussi ceux ajoutés par script) :
  les `href` restent écrits comme en français. `REV.url()` fait de même.
- Textes des scripts partagés : `REV.t('texte français', { n })` + `REV.i18n.add({ 'texte français': 'English' })`
  dans le même fichier. Les scripts en ligne des pages anglaises sont simplement traduits dans la page.
- Données : `data/en/<même chemin>.js`, chargé par la page anglaise juste après le fichier français :
  `REV.i18n.patch(window.TAA_EX, { id: {…} })` (fusion champ par champ, tableaux élément par élément ;
  `'key'` en 3e argument pour `TAA_EXAMS` / `ELEC_EXAMS`), `REV.i18n.qcm({ id: { q, o, x, fig } })` (appliqué
  après le dédoublonnage, qui reste calculé sur le français ; `src` se traduit seul), `REV.i18n.topics({…})`.
- Vocabulaire anglais : celui du cours d’élec officiel en anglais et des sujets d’algo anglais (2018-2020) :
  `is-defined-iaoi`, types / uses / operations / preconditions / axioms / with, emptylist, cons, tail, first, head,
  contents, next, nth, insert, delete, length, push, pop, top, isempty, enqueue, dequeue… Sur une page anglaise,
  `taa.js` renomme ses jeux d’axiomes (`EN_NAMES`) : les termes des bancs s’écrivent en anglais. Décimales à
  point en anglais (`circuit.js` convertit les étiquettes des schémas).
- `node tools/check_i18n.js [--verbose]` : jumelles, `id`, scripts `data/en`, ids inconnus, options de QCM,
  textes restés en français.

## Formats de données

- **Questions** (`data/qcm/<matière>*.js`, poussées dans `window.QCM_BANK`) :
  `{ id:'elec-…', s:'elec', topic, lvl, type:'single'|'multi'|'tf'|'num', q, o, a, unit, tol, x, ref, src, fig, keep,
  same, also }`. Toujours lire la banque avec `REV.quiz.bank()` : elle retire les doublons (même énoncé, mêmes options
  dans n’importe quel ordre, même réponse, même figure) en gardant partiel > TD > cours > hebdo ; les ids écartés vont
  dans `q.alt`. Une reformulation se déclare avec `same:'<id gardé>'` ; une question de cours tombée à un partiel sans
  fiche à elle porte `also:['elec-p2017-q3', …]`. `REV.quiz.ids(q)` rend tous ces ids (filtres par provenance et par
  partiel). Les doublons de la banque hebdo se déclarent dans `SAME` (`tools/gen_hebdo.py`).
  Les noms lisibles des notions vont dans `window.QCM_TOPICS`. Préfixes d’id utilisés par le filtre « provenance » :
  `elec-cN-` (cours), `elec-pAAAA-` (partiel de l’année AAAA), `elec-mcq…` (QCM hebdo), `elec-td…` (TD).
- **Exercices** (`data/elec/ex-*.js`, poussés dans `window.ELEC_EX`) : voir l’en-tête de `elec/entrainement.html`
  et le format complet (id, exam, kind, order, src, title, pts, topics, lvl, time, intro, figs, questions, hints,
  solution, answer, traps, official). Une figure est `{spec}` (schéma), `{svg}` ou `{img:'assets/img/…', alt}`.
- **Sujets d’élec** (`data/elec/exams.js`) : `window.ELEC_EXAMS` (clé `pAAAA` = année du partiel ; promo = AAAA + 5),
  `window.ELEC_TOPICS`, `window.ELEC_CATS`.
  Programme de l'examen 1 (annonce d'octobre 2026) : cours jusqu'à la page 15 (associations de résistances) et TD 1
  jusqu'à l'exercice 5 ; **Thévenin, Norton, Millman, superposition hors examen 1** (chapitre 3 du site, notions du QCM
  décochées via `window.QCM_OFF`) ; meilleurs modèles : partiels 2020 à 2022 (2020 entièrement au programme).
- **Exercices TAA** (`data/taa/ex-*.js`, poussés dans `window.TAA_EX`) : même idée que l’élec, sans schémas :
  `{ id, exam, kind:'partiel'|'td'|'archive'|'cours', order, src, title, pts, topics, lvl, time, intro,
  specs:[{ code, cap }], questions, hints, solution:[{ t, html, spec }], answer (HTML ou { html, spec }), traps,
  grading, official }`. Notions : `window.TAA_TOPICS` et sujets : `window.TAA_EXAMS` (`data/taa/exams.js`).
  Fichiers : `ex-annales.js` (partiels 2017-2024), `ex-externes.js` (janvier 2018, cours en ligne, exercices
  construits). QCM : `data/qcm/taa.js` (cours), `taa-annales.js` (questions de cours des partiels, rattachées par
  `same`), `taa-hebdo.js` (QCM hebdo des promos 2021 à 2030, `also` = autres apparitions).
  Points vérifiés : une constante retourne un type défini (partiel 2023) ; la signature occupe les zones types,
  utilise, opérations ; « opération auxiliaire » = sert à écrire le domaine d’une autre. Annonce de l'examen (24 octobre 2026) : types abstraits,
  listes récursives et itératives, piles et files ; lire, appliquer et reconnaître des axiomes, en rédiger ; ensembles non cités.
- **Physique** (mécanique du point) : exercices `data/physique/ex-annales.js` (partiels 2017-2022 au programme)
  et `ex-td.js` (TD 1 à 5) dans `window.PHYS_EX` (même format, `figs: [{ svg, cap }]`), sujets `PHYS_EXAMS`
  (parties `prog`, `progPts`) et notions `PHYS_TOPICS` (`data/physique/exams.js`), QCM `data/qcm/physique.js`
  (`phys-cN-…`) et `physique-annales.js` (`phys-pAAAA-…`, `p2018s` pour le sujet de mai 2018). Points vérifiés :
  les 7 anciens sujets ne portent que sur la cinématique (forces, 2e loi, énergie : jamais tombés) ; Frénet, abscisse
  curviligne, produit vectoriel hors programme cette année ; le cours anglais dit « Newton's second law », poids W⃗,
  énergie cinétique E_k. Programme du partiel 1 envoyé par le prof (octobre 2026) : cinématique cartésienne, 2e loi, conditions
  particulières (sommet : v_y = 0), forces du cours et des TD, travail, Ec, Ep, EM, théorèmes de l'énergie cinétique et mécanique (et
  lequel choisir), projections et normes. **Coordonnées polaires et mouvement circulaire hors partiel 1** (chapitre 4, TD 5 ; parties
  `prog: false`, notions du QCM décochées via `window.QCM_OFF`).
- **Caml** (Caml et récursivité) : cours `caml/cours-1-bases`, `-2-recursivite`, `-3-listes`, `-4-ordre-superieur`
  (`data-done="caml:<chapitre>:sN"`, chapitres bases, recursivite, listes, ordre) ; exercices `window.CAML_EX`
  (`data/caml/ex-annales.js` : 28 fiches des sujets 2017-2024, ids `pAAAA-exN`, `p2019d` = contrôle S1# d’avril 2019 ;
  `ex-td.js` : séminaire `sem-…`, TP `tp-…`, TD `td-listes-…`, `td-os-…`, avec `also` / `near`), blocs de code
  partagés `window.CAML_ML` ; sujets `CAML_EXAMS` (parties TAA marquées `caml:false`) et notions `CAML_TOPICS`
  (`data/caml/exams.js`) ; QCM `data/qcm/caml.js` (`caml-cN-…`) et `caml-annales.js` (`caml-pAAAA-qN`), écrits en
  balisage léger converti à la fin du fichier (`` `code` ``, `{{réponse}}`). **Tout code est exécuté avec OCaml 4.14**
  (`apt-get install -y -q ocaml-nox`) et sa réponse recopiée telle quelle, sans les lignes « Line 1, characters … ».
  Points vérifiés : liste + exception exigée 9 sujets sur 9 (`Failure` 7/9), ordre supérieur 7/9, Mystery 7/9,
  récursivité sur les entiers seuls jamais ; aucune fonction prédéfinie hors `failwith` / `invalid_arg` ; trois
  exercices retombés tels quels (assoc, for_all2, insert_nth) n’ont qu’une fiche. Corrigés officiels fautifs :
  2019 `remove_nth` (`Failure` au lieu d’`Invalid_argument`), 2018 `encode` (ne compile pas). La page Moodle
  « Conseils pour la récursivité » écrit `mult_rec (x, y-1)` : coquille. Éviter `@` dans les corrigés.
- **Archi** (Architecture des ordinateurs · Numération) : cours `archi/cours-1-bases`, `-2-operations`, `-3-entiers`,
  `-4-flottants` (`data-done="archi:<chapitre>:sN"`, chapitres bases, operations, entiers, flottants) ; exercices
  `window.ARCHI_EX` (`data/archi/ex-annales.js` : fiches des 10 sujets, ids `pAAAA-exN`, p2025 = examen B1 2025-2026
  du Moodle ; `ex-td.js` : TD 1 et 2, `td1-ex1`…, `near` vers un sujet ; `ex-td3.js` : TD 3 ex. 1 à 4, `td3-ex1`…, seuls au programme) ; sujets `ARCHI_EXAMS` (`prog`, `progPts`) et
  notions `ARCHI_TOPICS` (`data/archi/exams.js`) ; QCM `data/qcm/archi.js` (`archi-cN-…`) et `archi-annales.js`
  (`archi-pAAAA-qN`). **Tout nombre est recalculé par programme** (`data-eq` dans les pages, relus par un script).
  Points vérifiés : « n chiffres après la virgule » = troncature, jamais d’arrondi ; IEEE 754 aux 3 derniers sujets
  (encoder en simple : S / E / M en binaire sans espace ; décoder du double : « k × 2ⁿ », k impair, ou NaN) ; tableau
  8 bits avec ERREUR en cas de dépassement ; extension de signe, BCD, Gray, ASCII jamais tombés. Chapitre 2 (flottants), TD 3 et corrigés des TD 1 à 3 publiés le 24 octobre :
  le cours 4 reprend leurs méthodes en cinq étapes ; tous les corrigés officiels des TD sont justes (recalculés). Coquilles
  du chapitre 1 relevées (0,4025 pour 0,40625, « 0 − 1 = 1 → on emprunte »…) : ne pas les recopier.
- **Maths** (examen 1 : OBM et DP, mercredi 28 octobre) : cours `maths/cours-1-logique`, `-2-ensembles`, `-3-fonctions`,
  `-4-raisonnement` (OBM), `-5-denombrement`, `-6-probabilites`, `-7-variables` (DP) (`data-done="maths:<chapitre>:sN"`) ;
  exercices `window.MATHS_EX` (`data/maths/ex-annales.js` : sujets `p2025-dp`, `p2025-obm` (Moodle, sans corrigé), `p2024-dp`, `p2024-obm`, `p2023-dp`, `p2023-le`, puis
  contrôles combinés 2018-2022 ; `ex-td.js` : séminaire `sem-…`, TD `td1-…`, `td2-…`, feuilles `tdx-…`, avec `near`),
  sujets `MATHS_EXAMS` (`ecue`, `prog`, `progPts`), notions `MATHS_TOPICS` et `MATHS_ECUE` (`data/maths/exams.js`) ; QCM
  `data/qcm/maths.js` (`maths-cN-…`) et `maths-annales.js` (`maths-p2024-dp-qN`…, `maths-mcq…`, `maths-td…`). Le QCM
  accepte les suffixes `-dp`, `-obm`, `-le`. **Tout calcul est vérifié par programme** (sympy, fractions, énumération ;
  `data-eq` relus par script). Sources : transcriptions Markdown + LaTeX des PDF du Moodle (faites par Gemini, à
  revérifier) ; notes manuscrites d'un élève : jamais une source de vérité. Points vérifiés : DP 2023 et 2024 ont la même
  architecture (dénombrement, identité binomiale, conditionnelles avec seuil, une démonstration à connaître, Bernoulli →
  binomiale sur 20 tirages) ; relations binaires tombées à chaque sujet de 2019 à 2025, mais **hors programme en 2026** (mail de la prof du 19 octobre : ex. 4 à 6 d'OBM 2025 retirés, donc aussi intégrales et complexes ; parties `prog: false`, notion `relations` sans ECUE, décochée par défaut au QCM via `window.QCM_OFF`) ; règles de rédaction du séminaire (§ 4.2) « très importantes » d'après la prof ; DP 2025 reprend la démonstration de 2024 (E(aX+b), Var(aX+b)) ; l'entraînement a un filtre « Sans les ★ » (la prof : refaire les exercices non étoilés) ; corrigé 2019 faux (« tableau » :
  2 520 anagrammes) ; fiche « Probabilités conditionnelles » : formule des probabilités totales mal écrite. APIS (analyse)
  relève de l'examen 2 (décembre) : chapitres à ajouter.
- **Piloter S1** (méthodologie de travail et gestion de groupe, ateliers Edvia) : une seule page `piloter/index.html` (résumé
  des ateliers, sert aussi de fiche à l'impression ; `data-done="piloter:methodo|groupe:sN"`, 5 parties chacun), thème
  `piloter.css` (paperboard d'atelier) ; QCM `data/qcm/piloter.js` (`pil-mt-NN`, `pil-gg-NN`, mises en situation, `ref` vers
  `piloter/index.html#mtN|ggN`). Examen : deux QCM de 40 questions sans point négatif, jeudi 29 octobre (14 h 15, 15 h 30).
  Supports des ateliers 5 (24 octobre) intégrés : gg5 = décision commune, biais de groupe, RACI (sans corrigé : exemples du site).
- **Dates des examens** : `OFFICIAL` dans `core.js` (semaine du 26 octobre 2026 : date, début et fin de chaque épreuve, planning « Examens du B1 SUP ») ;
  `REV.exams.get(id)` rend la date saisie par l'élève, sinon la date officielle.
- **Annales toutes matières** : `data/annales.js`, généré par `tools/gen_annales.py` depuis un clone
  d’Epidocs/Past-Exams.
- **QCM hebdo d’élec** : `data/qcm/elec-hebdo.js` est généré par `python3 tools/gen_hebdo.py` depuis les banques
  `tools/src/elec_mcq_bank*.json` (promos 2021 à 2030) ; corriger une question dans le JSON puis regénérer.

## Ajouter une matière

1. Ajouter/compléter son entrée dans `SUBJECTS` (`assets/js/core.js`) avec `status:'ready'`, son chemin et ses
   chapitres (`sections` = nombre de parties avec un bouton « J’ai compris »).
2. Créer son dossier (`maths/`, …) avec **sa propre identité visuelle** (une feuille `assets/css/<matière>.css`
   avec le même jeu de jetons que `elec.css` : `--bg --surface --ink --muted --line --accent --ok --bad …`,
   versions claire et sombre). Chaque matière doit avoir un style à elle.
3. Banque de QCM `data/qcm/<matière>.js` + l’ajouter aux `<script>` de `qcm/index.html` et `index.html`.
4. Fiche : ajouter l’entrée dans `fiches/index.html`.

## Rédaction

- Contenu du site : français, ton neutre et clair, tutoiement, phrases courtes, pas d’emoji.
- Toute affirmation « ce qui tombe au partiel » doit être vérifiée dans les sujets (dates : partiel nov. 2017 =
  promo 2022, …, oct. 2024 = promo 2029).
- Décimales à la française (2,5 V), espace avant l’unité, signe moins « − ». L’espace entre un nombre et son unité
  devient insécable à l’affichage (`REV.util.tidy`, appliqué à tout le texte, même ajouté par script) : une espace
  simple suffit dans les sources.
- Lire le sens des flèches sur la figure d’origine avant tout calcul (TD 1 Ex 9 : I₁ monte, U = 35 V, pas −5 V).

## Vérifier

```
python3 -m http.server 8765 --bind 127.0.0.1 &
NODE_PATH=$(npm root -g) node tools/check.js http://127.0.0.1:8765/ "index.html,qcm/index.html,elec/index.html" ./shots shots
NODE_PATH=$(npm root -g) node tools/elshot.js "http://127.0.0.1:8765/elec/entrainement.html" "#p2024-ex3a" ./shots/x "#p2024-ex3a [data-act=sol]:1"
```
`check.js` signale les erreurs console et tout débordement horizontal (1280 px et 375 px, clair et sombre).
`node tools/check_i18n.js` vérifie la version anglaise (à lancer après toute modification de contenu).

## Mise en ligne

Site public : https://epita.arthurjeaugey.com, servi par GitHub Pages depuis la branche `main` (dossier racine ;
`CNAME` = domaine, `.nojekyll`). Ce qui est sur `main` est en ligne : y fusionner le travail une fois vérifié.

## Aperçu claude.ai

Aperçu privé du site : https://claude.ai/artifact/4ERsrJDktPHYY92et9KQmH. Pour le mettre à jour,
`python3 tools/artifact_entry.py <dossier>` produit la page d’entrée et `files.json`, puis publier cette page avec
ces fichiers en passant l’URL ci-dessus (`url`) pour garder le même lien.
