/* QCM TAA : les questions de cours des sujets d’algo de mi-semestre (partie types abstraits), 2019 à 2023.
   Ids taa-pAAAA-qN : AAAA = année du partiel, N = numéro de la question dans l’exercice « Un peu de cours… ».
   Énoncés verbatim quand ils se prêtent à un choix, sinon reformulés (dit dans l’explication).
   Bonne réponse : celle du corrigé officiel (2019, 2021, 2022) ou de la copie corrigée de 2023 (pas de corrigé officiel).

   Recoupements avec la banque du cours (data/qcm/taa.js, chargée avant ce fichier) : une question que le cours pose
   déjà, avec la même réponse attendue, porte same:'taa-c…'. Elle ne s’affiche pas en double : REV.quiz.bank() la
   rattache à la question du cours, dont les ids (REV.quiz.ids) comprennent alors celui du partiel. Les filtres
   « partiel » du QCM et le compte de la page des annales la retrouvent donc. Pour afficher plutôt la version du
   partiel, il suffit de retirer son same. Une question tombée à deux partiels porte l’id du premier et also:[second]. */
(function () {
  var B = window.QCM_BANK = window.QCM_BANK || [];
  var T = window.QCM_TOPICS = window.QCM_TOPICS || {};
  /* noms des notions (déjà donnés par data/qcm/taa.js ; repris ici si ce fichier est chargé seul) */
  var NAMES = { 'taa-signature': 'Signature et vocabulaire', 'taa-hierarchie': 'Types et opérations : la hiérarchie', 'taa-precond': 'Préconditions',
    'taa-axiomes': 'Axiomes', 'taa-liste-rec': 'Listes récursives', 'taa-liste-iter': 'Listes itératives' };
  Object.keys(NAMES).forEach(function (k) { if (!T[k]) T[k] = NAMES[k]; });

  var C1 = 'taa/cours-1-types.html', C2 = 'taa/cours-2-listes.html';
  var ZONES = ['<code>types</code>', '<code>utilise</code>', '<code>opérations</code>', '<code>préconditions</code>', '<code>axiomes</code>', '<code>avec</code>'];
  /* même question posée à un autre partiel : copie avec son propre id et sa source */
  function twin(q, id, src) { var c = {}; for (var k in q) c[k] = q[k]; c.id = id; c.src = src; return c; }

  /* ---------- questions propres aux partiels ---------- */
  var Q = [
    { id: 'taa-p2019-q4', topic: 'taa-signature', lvl: 1, type: 'multi', keep: true, src: 'Partiels 2019 et 2022 · Ex 1 · Q4', also: ['taa-p2022-q4'],
      q: 'Quelles zones constituent la signature d’un type abstrait ?',
      o: ZONES, a: [0, 1, 2],
      x: 'Corrigés de 2019 et de 2022 : « les zones TYPES, UTILISE et OPERATIONS ». La signature donne les types, définis et prédéfinis, et le profil de chaque opération. Les préconditions et les axiomes donnent les propriétés des opérations, et <code>avec</code> le type des variables : ces trois zones n’en font pas partie (c’était la question de 2021). Le piège : oublier <code>utilise</code>.',
      ref: C1 + '#s2' },
    { id: 'taa-p2021-q1', topic: 'taa-hierarchie', lvl: 1, type: 'single', keep: true, src: 'Partiels 2021 et 2022 · Q1', also: ['taa-p2022-q1'],
      q: 'Que retourne un observateur ?',
      o: ['un type défini', 'un type prédéfini', 'toujours un booléen', 'rien : il lit la donnée sans rien rendre'], a: 1,
      x: 'Corrigés de 2021 et de 2022 : « Un observateur retourne un type prédéfini. » (En 2022 : « Quel type de données retourne un observateur ? ».) Il prend au moins un argument de type défini et rend un type déjà conçu, cité dans <code>utilise</code> : <code>longueur : liste → entier</code>, <code>sommet : pile → élément</code>. Un type défini, c’est ce que retourne une opération interne. Le booléen n’est qu’un cas : <code>estvide</code> en rend un, <code>longueur</code> rend un entier.',
      ref: C1 + '#s4' },
    { id: 'taa-p2022-q5', topic: 'taa-liste-rec', lvl: 2, type: 'multi', keep: true, src: 'Partiel 2022 · Ex 1 · Q5',
      q: 'Parmi ces opérations, lesquelles définissent une liste récursive (sans places) ?',
      o: ['<code>cons</code>', '<code>tête</code>', '<code>fin</code>', '<code>ième</code>', '<code>premier</code>', '<code>listevide</code>'], a: [0, 2, 4, 5],
      x: 'Question reformulée : le sujet demandait « Donnez trois opérations définissant une liste récursive (sans places). » Corrigé de 2022 : « listevide, cons, fin, premier » (il en cite quatre ; trois suffisaient). <code>tête</code> rend une place : « sans places » l’exclut. <code>ième</code> appartient à la liste itérative.',
      ref: C2 + '#s2' },
    { id: 'taa-p2023-q2', topic: 'taa-liste-iter', lvl: 2, type: 'multi', keep: true, src: 'Partiel 2023 · Ex 1 · Q2',
      q: 'Parmi ces opérations, lesquelles définissent une liste itérative (sans places) ?',
      o: ['<code>longueur</code>', '<code>accès</code>', '<code>ième</code>', '<code>cons</code>', '<code>supprimer</code>', '<code>contenu</code>'], a: [0, 2, 4],
      x: 'Question reformulée : le sujet demandait « Donnez deux opérations définissant une liste itérative (sans places). » Pas de corrigé officiel ; sur la copie corrigée, « longueur et supprimer » a eu 2 points sur 2. <code>longueur</code> et <code>ième</code> suffisent à décrire une liste itérative ; <code>insérer</code>, <code>supprimer</code> et <code>liste-vide</code> conviennent aussi. <code>accès</code> et <code>contenu</code> utilisent les places, et <code>cons</code> appartient à la liste récursive.',
      ref: C2 + '#s5' }
  ];

  /* ---------- questions que le cours pose déjà (same : rattachées à la question du cours) ---------- */
  var AXIOMES_PB = { id: 'taa-p2019-q3', same: 'taa-c1-34', topic: 'taa-axiomes', lvl: 1, type: 'multi', keep: true, src: 'Partiel 2019 · Ex 1 · Q3',
    q: 'Quels problèmes se posent lors de la conception de l’ensemble des axiomes ?',
    o: ['la complétude', 'la consistance', 'la récursivité', 'la commutativité'], a: [0, 1],
    x: 'Corrigés de 2019 et de 2021 : « Les problèmes qui se posent lors de la conception de l’ensemble des axiomes sont la complétude et la consistance. » Complétude : avoir écrit suffisamment d’axiomes. Consistance : pas d’axiomes contradictoires. Le mot du cours est consistance, pas cohérence.',
    ref: C1 + '#s8' };
  var AXIOMES_COMMENT = { id: 'taa-p2019-q5', same: 'taa-c1-33', topic: 'taa-axiomes', lvl: 1, type: 'single', keep: true, src: 'Partiel 2019 · Ex 1 · Q5',
    q: 'Comment écrit-on des axiomes ?',
    o: ['en appliquant des observateurs aux opérations internes', 'en appliquant des opérations internes aux observateurs', 'en recopiant les préconditions', 'en donnant un exemple de valeur pour chaque opération'], a: 0,
    x: 'Corrigés de 2019 et de 2021 : « Nous écrivons des axiomes en appliquant des observateurs aux opérations internes ». Exemple : <code>sommet(empiler(p, e)) = e</code>, l’observateur <code>sommet</code> à l’extérieur, l’opération interne <code>empiler</code> à l’intérieur.',
    ref: C1 + '#s6' };
  var PARTIELLE = { id: 'taa-p2021-q2', same: 'taa-c1-28', topic: 'taa-precond', lvl: 1, type: 'single', keep: true, src: 'Partiel 2021 · Ex 2 · Q2',
    q: 'Comment appelle-t-on une opération qui n’est pas définie partout ?',
    o: ['une opération auxiliaire', 'une opération partielle', 'un observateur', 'une constante'], a: 1,
    x: 'Corrigés de 2021 et de 2022 : « Une opération qui n’est pas définie partout est une opération partielle. » Son domaine de définition s’écrit dans les préconditions. L’opération auxiliaire est celle qui sert à écrire ce domaine (question de 2019).',
    ref: C1 + '#s5' };

  Q.push(
    { id: 'taa-p2019-q1', same: 'taa-c1-15', topic: 'taa-hierarchie', lvl: 1, type: 'single', keep: true, src: 'Partiel 2019 · Ex 1 · Q1',
      q: 'Que retourne une opération interne ?',
      o: ['un type prédéfini', 'un type défini', 'un booléen', 'rien : elle modifie la donnée'], a: 1,
      x: 'Corrigé de 2019 : « Une opération interne retourne un type défini. » C’est le type que l’on définit, cité dans <code>types</code> : <code>cons : élément × liste → liste</code>. Un type prédéfini, c’est ce que retourne un observateur.',
      ref: C1 + '#s4' },
    { id: 'taa-p2019-q2', same: 'taa-c1-31', topic: 'taa-precond', lvl: 2, type: 'single', keep: true, src: 'Partiel 2019 · Ex 1 · Q2',
      q: 'Comment appelle-t-on une opération servant à spécifier le domaine de définition d’un autre ?',
      o: ['une précondition', 'une opération partielle', 'une opération auxiliaire', 'une opération interne'], a: 2,
      x: 'Corrigé de 2019 : « une opération auxiliaire ». Exemple : <code>est-présent</code> sert à écrire la précondition de <code>rechercher</code>, rechercher(e, λ) est-défini-ssi est-présent(e, λ) = vrai. La précondition est cette ligne, pas une opération. L’opération partielle, c’est <code>rechercher</code>, celle dont on décrit le domaine.',
      ref: C1 + '#s5' },
    AXIOMES_PB,
    AXIOMES_COMMENT,
    PARTIELLE,
    twin(AXIOMES_PB, 'taa-p2021-q3', 'Partiel 2021 · Ex 2 · Q3'),
    { id: 'taa-p2021-q4', same: 'taa-c1-02', topic: 'taa-signature', lvl: 1, type: 'multi', keep: true, src: 'Partiel 2021 · Ex 2 · Q4',
      q: 'Dans un type algébrique abstrait, quelles zones ne constituent pas la signature d’un type abstrait ?',
      o: ZONES, a: [3, 4, 5],
      x: 'Corrigé de 2021 : « Les zones qui ne composent pas la signature d’un type abstrait sont les zones PRECONDITIONS, AXIOMES et AVEC. » C’est la question inverse de celle de 2019 et de 2022.',
      ref: C1 + '#s2' },
    twin(AXIOMES_COMMENT, 'taa-p2021-q5', 'Partiel 2021 · Ex 2 · Q5'),
    twin(PARTIELLE, 'taa-p2022-q2', 'Partiel 2022 · Ex 1 · Q2'),
    { id: 'taa-p2022-q3', same: 'taa-c2-08', topic: 'taa-liste-rec', lvl: 1, type: 'single', keep: true, src: 'Partiel 2022 · Ex 1 · Q3',
      q: 'Quelles sont les deux façons de définir une liste ?',
      o: ['chaînée et contiguë', 'récursive et itérative', 'avec ou sans places', 'en pile et en file'], a: 1,
      x: 'Corrigé de 2022 : « Les deux manières de définir une liste sont la récursive et l’itérative. » C’est la même donnée, seule la manière de s’en servir change. Chaînée et contiguë parlent de la représentation en mémoire, pas du type abstrait.',
      ref: C2 + '#s8' },
    { id: 'taa-p2023-q1', same: 'taa-c1-03', topic: 'taa-signature', lvl: 1, type: 'single', keep: true, src: 'Partiel 2023 · Ex 1 · Q1',
      q: 'La définition d’une opération est composée de ?',
      o: ['son nom et ses axiomes', 'un nom et un profil', 'son profil et sa précondition', 'son nom seulement'], a: 1,
      x: 'Pas de corrigé officiel ; sur la copie corrigée, le correcteur a ajouté « Composé d’un nom et d’un profil ». Le profil donne les types des arguments et le type du résultat, par exemple <code>longueur : liste → entier</code>.',
      ref: C1 + '#s2' },
    { id: 'taa-p2023-q3', same: 'taa-c1-12', topic: 'taa-hierarchie', lvl: 2, type: 'single', keep: true, src: 'Partiel 2023 · Ex 1 · Q3',
      q: 'Quel type de données retourne une constante ?',
      o: ['un type prédéfini', 'un type défini', 'un booléen', 'aucun : une constante n’a pas de résultat'], a: 1,
      x: 'Une constante est une opération sans argument : <code>listevide : → liste</code>, <code>pilevide : → pile</code>, <code>vrai : → booléen</code> dans le type booléen. Elle rend le type que l’on définit : c’est une opération interne, jamais un observateur. Pas de corrigé officiel ; sur la copie corrigée, la réponse « prédéfini » a eu 0.',
      ref: C1 + '#s2' },
    { id: 'taa-p2023-q4', same: 'taa-c1-16', topic: 'taa-hierarchie', lvl: 1, type: 'single', keep: true, src: 'Partiel 2023 · Ex 1 · Q4',
      q: 'Quelles sont les spécifications du profil d’un observateur ?',
      o: ['un résultat de type défini', 'au moins un argument de type défini et un résultat de type prédéfini', 'un résultat de type prédéfini, quels que soient ses arguments', 'aucun argument'], a: 1,
      x: 'Pas de corrigé officiel ; sur la copie corrigée, « Il retourne un type prédéfini » a eu un crédit partiel, et le correcteur a ajouté « et prend un argument de type défini ». Il faut les deux conditions : au moins un argument de type défini, un résultat de type prédéfini.',
      ref: C1 + '#s4' });

  Q.forEach(function (q) { q.s = 'taa'; });
  Array.prototype.push.apply(B, Q);
})();
