import os, re, json, sys
from urllib.parse import quote
root = sys.argv[1]   # .../Past-Exams
out = sys.argv[2]
SUBJ = {'Elec':'elec','Maths PC':'maths','Phys':'physique','Algo':'algo','Archi':'archi','Prog':'prog','CIE':'cie','TE':'te','TIM':'tim'}
KIND = {'subject':'Sujet','correction':'Corrigé','answer_sheet':'Feuille de réponses'}
def url(rel):
    return 'https://past-exams.epidocs.eu/' + quote(rel)
groups = {}
base = os.path.join(root, 'S1', 'Midterms')
for dirpath, dirs, files in os.walk(base):
    for f in sorted(files):
        rel = os.path.relpath(os.path.join(dirpath, f), root).replace(os.sep, '/')
        parts = rel.split('/')  # S1 Midterms <subj> <promo> [variant...] file
        subj = SUBJ.get(parts[2]);
        if not subj: continue
        promo_raw = parts[3]
        promo = int(re.match(r'\d{4}', promo_raw).group(0))
        variant = []
        if '#' in promo_raw: variant.append('version B')
        variant += parts[4:-1]
        variant = ' · '.join(variant)
        key = (subj, promo, variant)
        g = groups.setdefault(key, {'subject': subj, 'promo': promo, 'year': promo - 5, 'variant': variant, 'files': []})
        name = f.lower()
        if name.endswith('.json'):
            g['files'].append({'kind': 'Grille du QCM (correction en ligne)', 'lang': '', 'url': 'https://mcq.epidocs.eu/?' + url(rel)})
            continue
        if name.endswith('.ml'):
            g['files'].append({'kind': 'Corrigé (OCaml)', 'lang': '', 'url': url(rel)}); continue
        kind = 'Document'
        for k, v in KIND.items():
            if '-' + k in name or '_' + k in name: kind = v
        if name.startswith('s1pa_'): kind = 'Corrigé' if 'cor' in name else 'Sujet'
        m = re.search(r'part_(\d)', name)
        if m: kind += ' (partie ' + m.group(1) + ')'
        lang = 'fr' if re.search(r'-fr\.pdf$', name) else ('en' if re.search(r'-en\.pdf$', name) else '')
        g['files'].append({'kind': kind, 'lang': lang, 'url': url(rel)})
order = {'Sujet':0,'Feuille de réponses':1,'Corrigé':2}
mid = []
for k in sorted(groups, key=lambda k: (k[0], -k[1], k[2])):
    g = groups[k]
    g['files'].sort(key=lambda x: (order.get(x['kind'].split(' (')[0], 3), x['kind'], x['lang'] != 'fr'))
    mid.append(g)
# QCM hebdo
mcq = {}
mb = os.path.join(root, 'S1', 'MCQs')
for dirpath, dirs, files in os.walk(mb):
    for f in sorted(files):
        rel = os.path.relpath(os.path.join(dirpath, f), root).replace(os.sep, '/')
        parts = rel.split('/')
        promo = int(parts[2])
        if 'Maths PA' in rel or '/en/' in rel: continue
        m = re.search(r'-(\d{2})(?:-fr)?(-correction)?\.(pdf|csv)$', f)
        if not m: continue
        n = int(m.group(1))
        e = mcq.setdefault((promo, n), {'promo': promo, 'year': promo - 5, 'n': n, 'files': []})
        e['files'].append({'kind': 'Corrigé' if m.group(2) else 'Sujet', 'fmt': m.group(3), 'url': url(rel)})
mcql = [mcq[k] for k in sorted(mcq, key=lambda k: (-k[0], k[1]))]
for e in mcql: e['files'].sort(key=lambda x: x['kind'] != 'Sujet')
H = 'https://annales.hyperion.tf/pdf/S1/'
hyper = [
  {'subject':'elec','label':'Contrôle (nov. 2017)','files':[{'kind':'Sujet','url':H+'Electronique/midterm-s1-sujet.pdf'}]},
  {'subject':'elec','label':'Partiel de fin de semestre','files':[{'kind':'Sujet','url':H+'Electronique/partiel-s1-sujet.pdf'},{'kind':'Corrigé','url':H+'Electronique/partiel-s1-correction.pdf'}]},
  {'subject':'elec','label':'TD 1 à 3, ED 1 (anciens)','files':[{'kind':'TD 1','url':H+'Electronique/td1-s1-sujet.pdf'},{'kind':'Corrigé TD 1','url':H+'Electronique/td1-s1-correction.pdf'},{'kind':'TD 2','url':H+'Electronique/td2-s1-sujet.pdf'},{'kind':'Corrigé TD 2','url':H+'Electronique/td2-s1-correction.pdf'},{'kind':'TD 3','url':H+'Electronique/td3-s1-sujet.pdf'},{'kind':'Corrigé TD 3','url':H+'Electronique/td3-s1-correction.pdf'},{'kind':'ED 1','url':H+'Electronique/ed1-s1-sujet.pdf'},{'kind':'Corrigé ED 1','url':H+'Electronique/ed1-s1-correction.pdf'}]},
  {'subject':'maths','label':'Midterm (archive)','files':[{'kind':'Sujet','url':H+'Mathematiques/midterm-s1-sujet.pdf'},{'kind':'Corrigé','url':H+'Mathematiques/midterm-s1-correction.pdf'}]},
  {'subject':'physique','label':'Midterm (archive)','files':[{'kind':'Sujet','url':H+'Physique/midterm-s1-sujet.pdf'}]},
  {'subject':'algo','label':'Midterm 2017','files':[{'kind':'Sujet','url':H+'Algorithmiques/S1_C1_2017_fr.pdf'},{'kind':'Feuille de réponses','url':H+'Algorithmiques/S1_C1_2017_reponses_fr.pdf'},{'kind':'Corrigé','url':H+'Algorithmiques/midterm-s1-correction.pdf'}]},
  {'subject':'archi','label':'Midterm (archive)','files':[{'kind':'Sujet','url':H+'Architecture/midterm-s1-sujet.pdf'}]},
  {'subject':'cie','label':'Midterm CIE (archive)','files':[{'kind':'Sujet','url':H+'SH/midterm-s1-cie.pdf'}]},
  {'subject':'tim','label':'Midterm TIM (archive)','files':[{'kind':'Sujet','url':H+'SH/midterm-s1-tim.pdf'}]},
  {'subject':'te','label':'Midterm TE 2022','files':[{'kind':'Sujet','url':H+'SH/2022-Midterm-TE-Sujet.pdf'}]},
]
data = {
  'updated': '2026-10-16',
  'subjects': {
    'elec': {'name':'Électronique','page':'elec/annales.html'},
    'maths': {'name':'Mathématiques'}, 'physique': {'name':'Physique'}, 'algo': {'name':'Algorithmique','page':'taa/annales.html'},
    'archi': {'name':'Architecture'}, 'prog': {'name':'Programmation'},
    'cie': {'name':'Anglais · CIE'}, 'tim': {'name':'Anglais · TIM'}, 'te': {'name':'Techniques d’expression'}
  },
  'midterms': mid, 'mcq': mcql, 'hyperion': hyper
}
with open(out, 'w', encoding='utf8') as fh:
    fh.write('/* Index des annales de partiels de mi-semestre S1 (généré depuis Epidocs/Past-Exams et HyperAnnales). */\n')
    fh.write('window.ANNALES = ' + json.dumps(data, ensure_ascii=False, indent=1) + ';\n')
print(len(mid), 'midterm groups;', len(mcql), 'mcq;', sum(len(g['files']) for g in mid), 'files')
from collections import Counter
print(Counter(g['subject'] for g in mid))
