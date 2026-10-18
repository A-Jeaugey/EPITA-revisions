# Révisions S1 — EPITA promo 2031

Site de révision des partiels de mi-semestre du S1 : cours expliqués pas à pas, ce qui tombe vraiment,
exercices d’annales corrigés, QCM à répétition espacée et fiches d’une page.

Tout le site existe en français et en anglais (section anglophone) : bouton **FR | EN** dans la barre du haut.
*The whole site is also available in English: use the **FR | EN** switch in the top bar.*

## Ce qu’il y a dedans

| Page | Contenu |
|---|---|
| `index.html` | Accueil : compte à rebours jusqu’au partiel, prochaine étape conseillée, progression par matière |
| `qcm/` | QCM central toutes matières : entraînement, examen blanc chronométré, questions à revoir (répétition espacée), filtres par notion et par provenance |
| `annales/` | Tous les sujets de partiels de mi-semestre S1 retrouvés (toutes matières), avec liens vers les PDF et les corrigés |
| `fiches/` | Les fiches d’une page de chaque matière |
| `elec/` | Électronique (Outils d’analyse de circuits) : accueil, 3 chapitres de cours interactifs, méthodes, entraînement, annales commentées, fiche A4 |
| `physique/` | Physique · Mécanique du point : accueil, 4 chapitres (cinématique cartésienne, forces et lois de Newton, travail et énergie, coordonnées polaires), méthodes de rédaction, entraînement (partiels et TD corrigés), annales commentées, fiche A4 |
| `taa/` | Algo · Types algébriques abstraits : accueil, 3 chapitres (types abstraits, listes, piles et files), méthodes, entraînement avec générateurs, annales commentées, fiche A4 |

Les autres matières (maths, Caml, archi…) arrivent quand leurs cours sont ajoutés ; leurs annales
sont déjà listées dans `annales/`.

## L’ouvrir

- **En local** : ouvre `index.html` dans un navigateur. Le site n’a pas de build et fonctionne aussi en `file://`.
- **En ligne** : https://epita.arthurjeaugey.com (GitHub Pages, *Deploy from a branch*, dossier `/ (root)` de
  la branche par défaut). Le fichier `CNAME` porte le domaine ; `.nojekyll` publie les fichiers tels quels.
  Côté DNS (Porkbun) : un enregistrement `CNAME` `epita` → `a-jeaugey.github.io`.

La progression (parties comprises, réponses au QCM, exercices réussis, date du partiel) est enregistrée dans le
navigateur (`localStorage`) : elle ne suit pas d’un appareil à l’autre. Elle est commune aux deux langues, et le
choix de langue est retenu.

## Sources

- Cours, TD 0 et TD 1 d’électronique de la promo 2031 (Moodle EPITA).
- Fiches de synthèse et types abstraits du cours TAA de la promo 2031 (Moodle EPITA, fiches de Nathalie Bouquet).
- Sujets de partiels et QCM hebdomadaires des promos précédentes :
  [Epidocs · Past-Exams](https://github.com/Epidocs/Past-Exams) et [HyperAnnales](https://annales.hyperion.tf/).
  Les corrigés ont été revérifiés par calcul ; les sujets sans corrigé officiel ont un corrigé rédigé.

## Structure du code

```
assets/css/   shell.css (barre de navigation), site.css (accueil, QCM, annales), elec.css (cahier de labo élec),
              circuit.css (schémas), qcm.css (cartes de questions), taa.css (cahier de spécification TAA)
assets/js/    core.js (stockage, thème, progression, navigation), circuit.js (schémas SVG à partir d’une description),
              qcm-engine.js (moteur de questions), elec.js (comportements des pages élec),
              spec.js (mise en forme des spécifications), taa.js (réécriture de termes, bancs TAA),
              meca.js (pages de physique, repères, trajectoires, vecteurs)
data/         annales.js (index des sujets), qcm/*.js (banques de questions), elec/*.js, taa/*.js, physique/*.js (sujets et exercices)
data/en/      textes anglais des mêmes fichiers, posés par-dessus le français (pages *.en.html)
tools/        scripts de génération et de vérification
```

Conventions et formats détaillés : voir `CLAUDE.md`.
