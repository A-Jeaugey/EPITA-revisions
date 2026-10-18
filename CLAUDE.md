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
- **Exercices TAA** (`data/taa/ex-*.js`, poussés dans `window.TAA_EX`) : même idée que l’élec, sans schémas :
  `{ id, exam, kind:'partiel'|'td'|'archive'|'cours', order, src, title, pts, topics, lvl, time, intro,
  specs:[{ code, cap }], questions, hints, solution:[{ t, html, spec }], answer (HTML ou { html, spec }), traps,
  grading, official }`. Notions : `window.TAA_TOPICS` et sujets : `window.TAA_EXAMS` (`data/taa/exams.js`).
  Fichiers : `ex-annales.js` (partiels 2017-2024), `ex-externes.js` (janvier 2018, cours en ligne, exercices
  construits). QCM : `data/qcm/taa.js` (cours), `taa-annales.js` (questions de cours des partiels, rattachées par
  `same`), `taa-hebdo.js` (QCM hebdo des promos 2021 à 2030, `also` = autres apparitions).
  Points vérifiés : une constante retourne un type défini (partiel 2023) ; la signature occupe les zones types,
  utilise, opérations ; « opération auxiliaire » = sert à écrire le domaine d’une autre.
- **Physique** (mécanique du point) : exercices `data/physique/ex-annales.js` (partiels 2017-2022 au programme)
  et `ex-td.js` (TD 1 à 5) dans `window.PHYS_EX` (même format, `figs: [{ svg, cap }]`), sujets `PHYS_EXAMS`
  (parties `prog`, `progPts`) et notions `PHYS_TOPICS` (`data/physique/exams.js`), QCM `data/qcm/physique.js`
  (`phys-cN-…`) et `physique-annales.js` (`phys-pAAAA-…`, `p2018s` pour le sujet de mai 2018). Points vérifiés :
  les 7 anciens sujets ne portent que sur la cinématique (forces, 2e loi, énergie : jamais tombés) ; Frénet, abscisse
  curviligne, produit vectoriel hors programme cette année ; le cours anglais dit « Newton's second law », poids W⃗,
  énergie cinétique E_k. Programme du partiel 1 non publié : le site suppose les TD 1 à 5.
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
