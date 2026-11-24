# Prépare l'aperçu claude.ai (Artifact) du site : la page d'entrée est index.html sans son enveloppe
# <html>/<head>/<body> (l'hébergeur en ajoute une), les autres fichiers sont publiés à leur chemin.
# Usage : python3 tools/artifact_entry.py <dossier de sortie>  -> <sortie>/index.html et <sortie>/files.json
import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__)); REPO = os.path.dirname(HERE)
out_dir = sys.argv[1]; os.makedirs(out_dir, exist_ok=True)
DROP = ('<!doctype', '<html', '<head>', '<meta charset', '<meta name="viewport"', '</head>', '</body>', '</html>')
lines = []
for l in open(os.path.join(REPO, 'index.html'), encoding='utf-8').read().split('\n'):
    t = l.strip()
    if t.startswith('<body'):
        lines.append("<script>document.documentElement.lang = 'fr'; document.body.setAttribute('data-resume', 'Accueil');</script>")
    elif not t.lower().startswith(DROP):
        lines.append(l)
open(os.path.join(out_dir, 'index.html'), 'w', encoding='utf-8').write('\n'.join(lines))
files = sorted(os.path.relpath(os.path.join(d, f), REPO) for root in ['assets', 'data', 'elec', 'qcm', 'annales', 'fiches', 'taa', 'physique', 'caml', 'archi', 'maths', 'piloter', 'boole', 'elec2', 'apis', 'lima', 'c', 'phys2']
               for d, _, fs in os.walk(os.path.join(REPO, root)) for f in fs)
# l'aperçu est limité à 512 fichiers : les pages qui ne font que rediriger (anciens chapitres déplacés au B2) n'y vont pas
SKIP = {'elec/cours-3-theoremes.html', 'elec/cours-3-theoremes.en.html', 'physique/cours-4-polaires.html', 'physique/cours-4-polaires.en.html'}
# Depuis novembre 2026 (matière C), le site dépasse cette limite. L'aperçu garde le bimestre en cours, les pages partagées
# et toutes les données ; les pages des matières du B1 (terminé) restent sur le site public seulement. Les polices KaTeX
# qu'aucune formule n'utilise (fraktur, script, sans serif, machine à écrire, gras italique) restent aussi hors de l'aperçu.
B1_DIRS = ('elec/', 'taa/', 'physique/', 'caml/', 'archi/', 'maths/', 'piloter/')
KATEX_UNUSED = {'KaTeX_Fraktur-Bold', 'KaTeX_Fraktur-Regular', 'KaTeX_Script-Regular', 'KaTeX_SansSerif-Bold', 'KaTeX_SansSerif-Italic',
                'KaTeX_SansSerif-Regular', 'KaTeX_Typewriter-Regular', 'KaTeX_Math-BoldItalic', 'KaTeX_Main-BoldItalic', 'KaTeX_Caligraphic-Bold'}
files = [f for f in files if f not in SKIP and not (f.startswith(B1_DIRS) and f.endswith('.html'))
         and os.path.splitext(os.path.basename(f))[0] not in KATEX_UNUSED]
# la page d'accueil anglaise est une page ordinaire, publiée à son chemin
files += sorted(f for f in os.listdir(REPO) if f.endswith('.en.html'))
json.dump([{'path': f} for f in files], open(os.path.join(out_dir, 'files.json'), 'w'))
print(len(files), 'fichiers à publier avec', os.path.join(out_dir, 'index.html'))
