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
files = sorted(os.path.relpath(os.path.join(d, f), REPO) for root in ['assets', 'data', 'elec', 'qcm', 'annales', 'fiches', 'taa', 'physique', 'caml']
               for d, _, fs in os.walk(os.path.join(REPO, root)) for f in fs)
# la page d'accueil anglaise est une page ordinaire, publiée à son chemin
files += sorted(f for f in os.listdir(REPO) if f.endswith('.en.html'))
json.dump([{'path': f} for f in files], open(os.path.join(out_dir, 'files.json'), 'w'))
print(len(files), 'fichiers à publier avec', os.path.join(out_dir, 'index.html'))
