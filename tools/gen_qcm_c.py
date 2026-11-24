# Génère data/qcm/c.js (Prog · C) : python3 tools/gen_qcm_c.py data/qcm/c.js. Les sorties de code ont été vérifiées en compilant avec gcc -Wall -Wextra -Werror -std=c99.
import json, sys
C1, C2, C3 = 'c/cours-1-bases.html', 'c/cours-2-tableaux.html', 'c/cours-3-chaines.html'
def k(s): return '<code>' + s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;') + '</code>'
Q = []
def q(id, topic, lvl, ref, text, o=None, a=0, x='', typ='single'):
    d = {'id': id, 'topic': topic, 'lvl': lvl, 'type': typ, 'q': text}
    if o is not None: d['o'] = o
    d['a'] = a; d['x'] = x; d['ref'] = ref; Q.append(d)

# ---------------------------------------------------------------- cours 1
q('c-c1-01', 'c-compil', 1, C1 + '#s1', 'Quelle est la différence entre Python et le C ?',
  ['Python est interprété ; le C est compilé en code machine avant d’être exécuté', 'Python est compilé ; le C est interprété', 'les deux sont interprétés', 'les deux sont compilés en code machine'],
  x='Un interpréteur exécute le code Python ; gcc traduit le fichier ' + k('.c') + ' en un exécutable que le processeur lance directement.')
q('c-c1-02', 'c-compil', 1, C1 + '#s1', 'Que fait ' + k('return 0;') + ' à la fin de ' + k('main') + ' ?',
  ['il indique au système que le programme s’est bien terminé', 'il affiche 0', 'il remet les variables à 0', 'il relance le programme'],
  x=k('main') + ' renvoie un ' + k('int') + ' au système d’exploitation : 0 veut dire « tout s’est bien passé ».')
q('c-c1-03', 'c-compil', 1, C1 + '#s1', k('printf') + ' ajoute tout seul un retour à la ligne à la fin de ce qu’il affiche.', a=False, typ='tf',
  x='Faux : il faut écrire ' + k('\\n') + ' dans la chaîne. Sans lui, la sortie suivante se colle à la même ligne.')
q('c-c1-04', 'c-compil', 1, C1 + '#s2', 'Que fait l’option ' + k('-Werror') + ' ?',
  ['elle transforme tout avertissement en erreur : la compilation échoue', 'elle cache les erreurs', 'elle active le débogage', 'elle nomme l’exécutable'],
  x=k('-Wall') + ' et ' + k('-Wextra') + ' activent les avertissements, ' + k('-Werror') + ' en fait des erreurs. Avec les options des TP, un avertissement empêche donc la compilation.')
q('c-c1-05', 'c-compil', 1, C1 + '#s2', k('int lives = 3;') + ' est déclarée mais jamais utilisée. Avec ' + k('gcc -Wall -Wextra -Werror -std=c99') + '…',
  ['le programme ne compile pas', 'il compile avec un simple avertissement', 'il compile sans rien dire', 'il plante à l’exécution'],
  x=k("error: unused variable 'lives' [-Werror=unused-variable]") + '. Même chose pour un paramètre jamais lu. Au TP, un code qui ne compile pas n’est pas noté.')
q('c-c1-06', 'c-compil', 1, C1 + '#s2', k('gcc -Wall -Wextra -Werror -std=c99 -o hello hello.c') + ' a réussi. Comment lancer le programme ?',
  [k('./hello'), k('hello.c'), k('gcc hello'), k('run hello')],
  x=k('-o hello') + ' a nommé l’exécutable ' + k('hello') + ' ; on le lance depuis le dossier courant avec ' + k('./hello') + '.')
q('c-c1-07', 'c-compil', 2, C1 + '#s6', 'Une fonction est déclarée dans ' + k('tools.h') + ', mais on oublie de donner ' + k('tools.c') + ' à gcc. Quelle erreur obtient-on ?',
  [k('undefined reference to `clamp\'') + ', à l’édition de liens', k("expected ';'") + ', à la compilation', k('unused variable'), 'aucune : le programme plante à l’exécution'],
  x='Le prototype suffit pour compiler ' + k('main.c') + ', mais l’édition de liens ne trouve la définition nulle part.')
q('c-c1-08', 'c-bases', 1, C1 + '#s3', 'Que vaut ' + k('7 / 2') + ' entre deux ' + k('int') + ' ?', a=3, typ='num',
  x='La division entre entiers donne le quotient entier : 3. Le reste, ' + k('7 % 2') + ', vaut 1.')
q('c-c1-09', 'c-bases', 2, C1 + '#s3', k('float r = 3 / 4;') + ' puis ' + k('printf("%.2f\\n", r);') + ' affiche…',
  [k('0.00'), k('0.75'), k('1.00'), 'une erreur de compilation'],
  x=k('3 / 4') + ' est calculé entre entiers (0) avant d’être rangé dans le ' + k('float') + '. Il faut ' + k('(float)3 / 4') + ' ou ' + k('3.0f / 4.0f') + '.')
q('c-c1-10', 'c-bases', 1, C1 + '#s3', 'Quel format de ' + k('printf') + ' affiche un ' + k('size_t') + ' ?',
  [k('%zu'), k('%d'), k('%f'), k('%s')],
  x=k('%d') + ' avec un ' + k('size_t') + ' ne compile pas avec les options des TP (' + k("format '%d' expects argument of type 'int'") + ').')
q('c-c1-11', 'c-bases', 2, C1 + '#s3', k("char c = 'B';") + ' puis ' + k('printf("%d\\n", c);') + ' affiche…',
  [k('66'), k('B'), k('2'), 'une erreur'],
  x='Un ' + k('char') + ' est un petit entier : ' + k('%d') + ' affiche son code ASCII (A = 65, B = 66), ' + k('%c') + ' le caractère.')
q('c-c1-12', 'c-cond', 1, C1 + '#s4', 'En C, quelle valeur est considérée comme fausse dans un ' + k('if') + ' ?',
  ['0, et seulement 0', 'toute valeur négative', '0 et 1', 'aucune : il faut un booléen'],
  x='0 est faux, toute valeur non nulle est vraie (même −3). Une comparaison vaut exactement 1 ou 0.')
q('c-c1-13', 'c-cond', 2, C1 + '#s4', 'Que vaut ' + k('(5 > 3) + (2 == 2) + (4 != 4)') + ' ?', a=2, typ='num',
  x='Chaque comparaison vaut 1 (vraie) ou 0 (fausse) : 1 + 1 + 0 = 2.')
q('c-c1-14', 'c-cond', 2, C1 + '#s4', 'Dans un ' + k('switch') + ', un ' + k('case') + ' qui affiche quelque chose n’a pas de ' + k('break') + ' et un autre ' + k('case') + ' le suit. Avec les options des TP…',
  ['le programme ne compile pas', 'le case s’arrête tout seul à sa fin', 'le case suivant est sauté', 'le programme plante'],
  x='Sans ' + k('break') + ', l’exécution continuerait dans le case suivant ; ' + k('-Wextra -Werror') + ' le refuse : ' + k('error: this statement may fall through') + '.')
q('c-c1-15', 'c-cond', 2, C1 + '#s4', k('if (hp = 0)') + ', avec les options des TP…',
  ['ne compile pas : gcc demande des parenthèses autour d’une affectation utilisée comme condition', 'teste si hp vaut 0', 'met hp à 0 puis entre toujours dans le if', 'compile sans rien dire'],
  x=k('=') + ' affecte, ' + k('==') + ' compare. gcc signale ' + k('suggest parentheses around assignment used as truth value') + ', transformé en erreur.')
q('c-c1-16', 'c-cond', 1, C1 + '#s4', 'Dans les TP, une fonction oui / non doit renvoyer…',
  ['exactement 0 ou 1', 'n’importe quel entier, non nul pour oui', k('true') + ' ou ' + k('false'), '−1 ou 1'],
  x='Les sujets l’exigent. Une comparaison ou un ' + k('&&') + ' valent déjà 0 ou 1 : ' + k('return hp > 0 && stamina >= 10;') + '.')
q('c-c1-17', 'c-cond', 1, C1 + '#s5', 'Quelle boucle exécute son corps au moins une fois, même si la condition est fausse au départ ?',
  [k('do { … } while (…);'), k('while (…) { … }'), k('for (…; …; …) { … }'), 'aucune'],
  x='Le ' + k('do … while') + ' teste la condition après le corps.')
q('c-c1-18', 'c-cond', 2, C1 + '#s5', 'Combien de fois s’affiche « hit » ? ' + k('for (int i = 0; i < 10; i += 3) { printf("hit\\n"); }'), a=4, typ='num',
  x='i vaut 0, 3, 6, 9, puis 12 arrête la boucle : 4 tours.')
q('c-c1-19', 'c-cond', 2, C1 + '#s5', 'Juste après ' + k('for (int i = 0; i < 5; i++) { … }') + ', on écrit ' + k('printf("%d\\n", i);') + '. Que se passe-t-il ?',
  ['erreur de compilation : i n’existe plus après la boucle', 'affiche 5', 'affiche 4', 'affiche 0'],
  x='Une variable déclarée dans un bloc (ici dans le ' + k('for') + ') n’existe que dans ce bloc.')
q('c-c1-20', 'c-fonctions', 1, C1 + '#s6', k('void reset(int x) { x = 0; }') + ' est appelée par ' + k('reset(hp);') + ' alors que hp vaut 30. Ensuite, hp vaut…',
  ['30', '0', 'une valeur indéterminée', 'erreur de compilation'],
  x='Les paramètres sont des copies : la fonction met sa copie à 0, pas hp. Pour changer hp, on renvoie la nouvelle valeur : ' + k('hp = f(hp);') + '.')
q('c-c1-21', 'c-fonctions', 1, C1 + '#s6', 'À quoi servent ' + k('#ifndef') + ', ' + k('#define') + ' et ' + k('#endif') + ' dans un fichier ' + k('.h') + ' ?',
  ['à empêcher que l’en-tête soit inclus deux fois', 'à définir la fonction', 'à inclure ' + k('stdio.h'), 'à commenter le fichier'],
  x='C’est la garde d’inclusion, exigée dans chaque en-tête des TP.')
q('c-c1-22', 'c-fonctions', 2, C1 + '#s6', k('main') + ' appelle ' + k('add(3, 4)') + ', mais ' + k('add') + ' est définie plus bas, sans prototype avant. Avec les options des TP…',
  ['ne compile pas : ' + k('implicit declaration of function \'add\''), 'compile et affiche 7', 'erreur à l’exécution', 'affiche 0'],
  x='Une fonction doit être déclarée avant son appel : définie plus haut, ou annoncée par son prototype ' + k('int add(int a, int b);') + ' (souvent dans un ' + k('.h') + ').')
q('c-c1-23', 'c-fonctions', 1, C1 + '#s6', 'Quelle différence entre ' + k('#include <stdio.h>') + ' et ' + k('#include "tools.h"') + ' ?',
  ['les chevrons pour un en-tête standard, les guillemets pour un en-tête local, à toi', 'aucune', 'les guillemets sont interdits en C99', 'les chevrons sont réservés aux fichiers ' + k('.c')],
  x=k('stdio.h') + ' vient avec le compilateur ; ' + k('tools.h') + ' est dans ton projet.')
q('c-c1-24', 'c-fonctions', 2, C1 + '#s6', k('int sign(int x)') + ' renvoie 1 si x > 0 et −1 si x < 0, mais n’a pas de ' + k('return') + ' pour x = 0. Avec les options des TP…',
  ['ne compile pas : ' + k('control reaches end of non-void function'), 'renvoie 0 pour x = 0', 'renvoie −1 pour x = 0', 'compile avec un simple avertissement'],
  x='Une fonction non ' + k('void') + ' doit renvoyer une valeur dans tous les cas. Ajoute un ' + k('return') + ' final.')
# ---------------------------------------------------------------- cours 2
q('c-c2-01', 'c-tableaux', 1, C2 + '#s1', k('int b[5] = {3, 1, 4, 1, 5};') + ' Que vaut ' + k('b[4]') + ' ?',
  ['5', '1', 'erreur : b[4] n’existe pas', '4'],
  x='Les indices vont de 0 à 4 : ' + k('b[4]') + ' est la cinquième et dernière case.')
q('c-c2-02', 'c-tableaux', 2, C2 + '#s1', k('int e[5] = {7, 8};') + ' Que vaut ' + k('e[3]') + ' ?',
  ['0', '8', 'une valeur indéterminée', 'erreur de compilation'],
  x='Dès qu’on donne des valeurs entre accolades, les cases restantes valent 0. D’où ' + k('int d[5] = {0};') + ' pour un tableau de zéros.')
q('c-c2-03', 'c-tableaux', 1, C2 + '#s1', 'Pour un tableau de n cases, les indices valides vont de…',
  ['0 à n − 1', '1 à n', '0 à n', '1 à n − 1'],
  x='Première case : indice 0 ; dernière : n − 1.')
q('c-c2-04', 'c-tableaux', 1, C2 + '#s1', k('int a[5];') + ', déclaré dans une fonction sans valeurs initiales, contient cinq zéros.', a=False, typ='tf',
  x='Faux : un tableau local non initialisé contient des valeurs indéterminées. ' + k('int a[5] = {0};') + ' le met à zéro.')
q('c-c2-05', 'c-tableaux', 1, C2 + '#s2', k('int a[] = {3, 1, 4, 1, 5, 9};') + ' Que vaut ' + k('sizeof(a) / sizeof(a[0])') + ' ?', a=6, typ='num',
  x=k('sizeof(a)') + ' vaut 24 octets (6 cases de 4 octets), ' + k('sizeof(a[0])') + ' vaut 4 : 6 cases.')
q('c-c2-06', 'c-tableaux', 2, C2 + '#s2', k('for (int i = 0; i < sizeof(a) / sizeof(a[0]); i++)') + ', avec les options des TP…',
  ['ne compile pas : comparaison entre un entier signé et un non signé', 'compile et parcourt le tableau', 'plante à l’exécution', 'boucle à l’infini'],
  x=k('sizeof') + ' donne un ' + k('size_t') + ', sans signe. ' + k('-Wextra') + ' signale ' + k('comparison of integer expressions of different signedness') + ' : prends ' + k('size_t i') + '.')
q('c-c2-07', 'c-tableaux', 3, C2 + '#s2', 'Pourquoi ' + k('for (size_t i = n - 1; i >= 0; i--)') + ' est-il faux ?',
  ['un ' + k('size_t') + ' n’est jamais négatif : ' + k('i >= 0') + ' est toujours vrai (et gcc le refuse)', 'i ne diminue pas', 'un ' + k('size_t') + ' ne peut pas valoir 0', 'il manque des accolades'],
  x='Après 0, i-- donne un nombre immense. Forme correcte : ' + k('for (size_t i = n; i > 0; i--)') + ' en lisant ' + k('a[i - 1]') + '.')
q('c-c2-08', 'c-tableaux', 1, C2 + '#s3', k('int a[3];') + ' puis ' + k('a[3] = 7;') + '. Que se passe-t-il ?',
  ['ça compile ; à l’exécution, c’est un comportement indéfini', 'erreur de compilation', 'le tableau s’agrandit d’une case', 'l’instruction est ignorée'],
  x='Le C ne vérifie pas les indices. Écrire hors du tableau peut sembler marcher, planter ou abîmer une autre variable.')
q('c-c2-09', 'c-tableaux', 1, C2 + '#s3', 'Laquelle de ces boucles sort du tableau ' + k('int a[4]') + ' ?',
  [k('for (int i = 0; i <= 4; i++)'), k('for (int i = 0; i < 4; i++)'), k('for (int i = 3; i >= 0; i--)'), k('for (int i = 1; i < 4; i++)')],
  x='Avec ' + k('<=') + ', le dernier tour lit ' + k('a[4]') + ', une case après la fin.')
q('c-c2-10', 'c-tableaux', 1, C2 + '#s4', 'Pourquoi passe-t-on la longueur d’un tableau en paramètre ?',
  ['la fonction ne peut pas la retrouver : elle reçoit le tableau, pas sa taille', 'pour aller plus vite', 'c’est une simple convention de style', 'pour que le tableau soit copié'],
  x='Dans la fonction, ' + k('sizeof(a)') + ' donnerait la taille d’une adresse, et gcc le refuse (' + k('sizeof on array function parameter') + ').')
q('c-c2-11', 'c-tableaux', 2, C2 + '#s4', k('void fill(int a[], size_t len, int v)') + ' range v dans chaque case. Après ' + k('fill(x, 4, 10);') + '…',
  ['les 4 cases de x valent 10 : le tableau n’est pas copié', 'x est inchangé : la fonction a travaillé sur une copie', 'x est vidé', 'erreur de compilation'],
  x='Contrairement à un ' + k('int') + ', un tableau passé à une fonction n’est pas copié : ses modifications se voient chez l’appelant.')
q('c-c2-12', 'c-tableaux', 1, C2 + '#s4', 'Que signifie ' + k('const') + ' dans ' + k('int sum_array(const int a[], size_t n)') + ' ?',
  ['la fonction ne modifie pas le tableau : écrire dedans ne compile pas', 'le tableau est copié', 'la taille est constante', 'le tableau doit être vide'],
  x='Écrire ' + k('a[i] = 0;') + ' donnerait ' + k('error: assignment of read-only location') + '.')
q('c-c2-13', 'c-tableaux', 2, C2 + '#s4', 'Pour calculer le maximum d’un tableau d’au moins une case, on initialise ' + k('best') + ' avec…',
  [k('a[0]'), k('0'), k('-1'), k('len')],
  x='Avec 0, un tableau de valeurs toutes négatives donnerait 0, qui n’y figure pas.')
q('c-c2-14', 'c-tableaux', 2, C2 + '#s4', 'Une fonction renvoie l’indice de la valeur cherchée, ou −1. Où placer ' + k('return -1;') + ' ?',
  ['après la boucle', 'dans un ' + k('else') + ', à l’intérieur de la boucle', 'avant la boucle', 'nulle part'],
  x='Dans un ' + k('else') + ', la fonction s’arrêterait dès la première case différente. On ne sait que la valeur est absente qu’une fois tout parcouru.')
q('c-c2-15', 'c-tableaux', 1, C2 + '#s5', k('int grid[2][3] = {{1, 2, 3}, {4, 5, 6}};') + ' Que vaut ' + k('grid[1][0]') + ' ?', a=4, typ='num',
  x=k('[ligne][colonne]') + ' : ligne 1 (la deuxième), colonne 0.')
q('c-c2-16', 'c-tableaux', 2, C2 + '#s5', 'Quel paramètre permet de passer ' + k('int map[3][4]') + ' à une fonction ?',
  [k('int map[][4]'), k('int map[][]'), k('int map[3][]'), k('int map')],
  x='Le nombre de colonnes doit être écrit ; le nombre de lignes peut manquer et se passe à part.')
# ---------------------------------------------------------------- cours 3
q('c-c3-01', 'c-chaines', 1, C3 + '#s1', k('char word[] = "robot";') + ' Que vaut ' + k('sizeof(word)') + ' ?', a=6, typ='num',
  x='5 lettres et le ' + k("'\\0'") + ' final, ajouté par les guillemets : 6 cases.')
q('c-c3-02', 'c-chaines', 1, C3 + '#s1', 'Que vaut ' + k('strlen("robot")') + ' ?',
  ['5', '6', '4', 'une erreur'],
  x=k('strlen') + ' compte les caractères avant ' + k("'\\0'") + '.')
q('c-c3-03', 'c-chaines', 2, C3 + '#s1', k("char b[] = {'H', 'i'};") + ' Peut-on écrire ' + k('printf("%s\\n", b);') + ' ?',
  ['non : sans ' + k("'\\0'") + ', ce n’est pas une chaîne, ' + k('%s') + ' lirait au-delà du tableau', 'oui, cela affiche Hi', 'oui, le ' + k("'\\0'") + ' est ajouté tout seul', 'non, cela ne compile pas'],
  x='Le ' + k("'\\0'") + ' n’est ajouté que pour une chaîne entre guillemets. Ici, ' + k('%s') + ' continuerait dans la mémoire voisine : comportement indéfini.')
q('c-c3-04', 'c-chaines', 1, C3 + '#s1', 'Combien de cases faut-il au moins pour ranger une chaîne de 10 caractères ?',
  ['11', '10', '9', '12'],
  x='n caractères, plus une case pour ' + k("'\\0'") + '.')
q('c-c3-05', 'c-chaines', 1, C3 + '#s2', 'Quelle condition d’arrêt pour parcourir une chaîne ' + k('s') + ' dans une fonction ?',
  [k("s[i] != '\\0'"), k('i < sizeof(s)'), k("s[i] != '0'"), k('i < 100')],
  x='On avance jusqu’au caractère nul. ' + k("'0'") + ' est le chiffre zéro (code 48), pas la fin.')
q('c-c3-06', 'c-chaines', 1, C3 + '#s2', 'Que vaut ' + k("'7' - '0'") + ' ?', a=7, typ='num',
  x='Les chiffres se suivent dans la table ASCII : la différence avec ' + k("'0'") + ' donne la valeur du chiffre.')
q('c-c3-07', 'c-chaines', 2, C3 + '#s2', k("char c = 'g';") + ' Quelle expression donne ' + k("'G'") + ' ?',
  [k("c - 'a' + 'A'"), k("c + 'A'"), k("c - 32 + 'a'"), k("'G' - c")],
  x=k("c - 'a'") + ' donne le rang de la lettre (6), auquel on ajoute ' + k("'A'") + '.')
q('c-c3-08', 'c-chaines', 2, C3 + '#s3', k('char *s = "hello";') + ' puis ' + k("s[0] = 'H';") + '. Que se passe-t-il ?',
  ['ça compile, puis ça plante : une chaîne littérale est en lecture seule', 'cela affiche Hello', 'erreur de compilation', 'rien ne change'],
  x='Pour une chaîne modifiable, il faut un tableau à soi : ' + k('char s[] = "hello";') + '.')
q('c-c3-09', 'c-chaines', 2, C3 + '#s3', 'Pour inverser une chaîne de longueur len sur place, on échange ' + k('s[i]') + ' et ' + k('s[len - 1 - i]') + ' pour i allant de 0 à…',
  [k('len / 2') + ' (exclu)', k('len') + ' (exclu)', k('len - 1'), 'la fin de la chaîne, ' + k("'\\0'") + ' compris'],
  x='Jusqu’au milieu : au-delà, on ré-échange tout. Le ' + k("'\\0'") + ' ne bouge pas.')
q('c-c3-10', 'c-chaines', 1, C3 + '#s4', 'Comment tester si deux chaînes a et b ont le même contenu ?',
  [k('strcmp(a, b) == 0'), k('a == b'), k('strcmp(a, b) == 1'), k('if (strcmp(a, b))')],
  x=k('==') + ' compare des adresses (et gcc refuse de comparer deux tableaux). ' + k('strcmp') + ' vaut 0 quand les chaînes sont égales.')
q('c-c3-11', 'c-chaines', 2, C3 + '#s4', 'En réécrivant une copie de chaîne ' + k('my_strcpy(dest, src)') + ', qu’oublie-t-on le plus souvent ?',
  ['d’écrire le ' + k("'\\0'") + ' final dans dest', 'de parcourir src', 'de déclarer i', 'de renvoyer dest'],
  x='La boucle s’arrête sur le ' + k("'\\0'") + ' de src sans le copier : il faut ' + k("dest[i] = '\\0';") + ' après.')
q('c-c3-12', 'c-chaines', 2, C3 + '#s4', 'Que renvoie ' + k('strcmp("cats", "cat")') + ' ?',
  ['un nombre positif', '0', 'un nombre négatif', 'exactement −1'],
  x='Les trois premières lettres sont égales, puis ' + k("'s'") + ' est comparé à ' + k("'\\0'") + ' (code 0) : « cats » vient après « cat ».')
q('c-c3-13', 'c-chaines', 1, C3 + '#s5', 'Après ' + k('fgets(line, sizeof(line), stdin)') + ' sur une ligne courte, la fin de line contient…',
  ['le ' + k("'\\n'") + ' de la touche Entrée, puis ' + k("'\\0'"), 'seulement les caractères tapés, puis ' + k("'\\0'"), 'deux ' + k("'\\0'"), 'une espace'],
  x='fgets garde le retour à la ligne s’il a la place : on l’enlève avant de comparer avec ' + k('strcmp') + '.')
q('c-c3-14', 'c-chaines', 1, C3 + '#s5', 'Que renvoie ' + k('fgets') + ' quand il n’y a plus rien à lire ?',
  [k('NULL'), k('0'), k('-1'), 'une chaîne vide'],
  x='On teste donc ' + k('if (fgets(line, sizeof(line), stdin) == NULL)') + '.')

head = """/* Banque de questions — Prog · C (PROG-102), bimestre 2. Générée par tools/gen_qcm_c.py :
   corriger là puis regénérer. Sources : CM 1 « Compiling and Running », CM 2 « Arrays and Strings », TP 1 et 2 du site
   PROG 2031 (reformulés, jamais recopiés). Toute sortie de code et tout message de gcc ont été obtenus en compilant
   avec gcc -Wall -Wextra -Werror -std=c99 (les options des TP). Ids « c-cN-NN » : cours N du site (c/cours-N-….html),
   dans l'ordre des parties ; les premières questions d'une partie servent à sa vérification. */
(function () {
  var B = window.QCM_BANK = window.QCM_BANK || [];
  var T = window.QCM_TOPICS = window.QCM_TOPICS || {};
  T['c-compil'] = 'Compiler avec gcc';
  T['c-bases'] = 'Types et printf';
  T['c-cond'] = 'Conditions et boucles';
  T['c-fonctions'] = 'Fonctions et en-têtes';
  T['c-tableaux'] = 'Tableaux';
  T['c-chaines'] = 'Chaînes de caractères';
  var Q = """
tail = """;
  Q.forEach(function (q) { q.s = 'c'; });
  Array.prototype.push.apply(B, Q);
})();
"""
body = '[\n' + ',\n'.join('    ' + json.dumps(d, ensure_ascii=False) for d in Q) + '\n  ]'
open(sys.argv[1], 'w', encoding='utf-8').write(head + body + tail)
print(len(Q), 'questions')
