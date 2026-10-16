# Convertit les banques JSON extraites des QCM hebdo en data/qcm/elec-hebdo.js (+ copie des schémas).
import json, os, re, shutil, sys, html
AN = sys.argv[1]; REPO = sys.argv[2]
TOPIC = {'loi-noeuds': 'kirchhoff', 'loi-mailles': 'kirchhoff', 'vocabulaire': 'vocabulaire', 'unites': 'grandeurs',
         'serie-parallele': 'serie-parallele', 'req': 'req', 'conventions': 'conventions', 'ohm': 'ohm',
         'diviseur-tension': 'diviseurs', 'diviseur-courant': 'diviseurs', 'equiv-thevenin-norton': 'norton', 'norton': 'norton',
         'thevenin': 'thevenin', 'potentiels': 'fleches', 'interrupteurs': 'appareils', 'appareils-mesure': 'appareils',
         'generateur-reel': 'generateurs', 'source-courant': 'generateurs', 'superposition': 'thevenin', 'millman': 'millman',
         'homogeneite': 'calcul', 'autre': 'grandeurs', 'grandeurs': 'grandeurs'}
REF = {'kirchhoff': 'C2#s2', 'vocabulaire': 'C2#s1', 'grandeurs': 'C1#s1', 'serie-parallele': 'C2#s4', 'req': 'C2#s5', 'conventions': 'C1#s4',
       'ohm': 'C1#s5', 'diviseurs': 'C2#s6', 'norton': 'C3#s5', 'thevenin': 'C3#s3', 'fleches': 'C1#s3', 'appareils': 'C1#s6',
       'generateurs': 'C1#s7', 'millman': 'C3#s7', 'calcul': 'C1#s8'}
# Questions reprises ailleurs avec un autre énoncé (le dédoublonnage automatique ne les voit pas) :
# id hebdo -> id de l'exemplaire à garder (voir R.quiz.bank dans assets/js/qcm-engine.js).
SAME = {'mcq2029-01-q21': 'elec-p2023-q1', 'mcq2029-01-q23': 'elec-p2023-q3', 'mcq2029-03-q23': 'elec-p2024-q5',
        'mcq2027-04-q50': 'elec-p2017-q4', 'mcq2027-02-q48': 'elec-c2-05', 'mcq2030-02-q21': 'elec-p2024-q4'}
def esc(s): return html.escape(str(s), quote=False)
banks = [f for f in ['elec_mcq_bank.json', 'elec_mcq_bank_2.json'] if os.path.exists(os.path.join(AN, f))]
out, seen = [], set()
os.makedirs(os.path.join(REPO, 'assets/img/qcm'), exist_ok=True)
for f in banks:
    for q in json.load(open(os.path.join(AN, f), encoding='utf8')):
        qid = 'elec-' + q['id']
        if qid in seen: continue
        seen.add(qid)
        topic = TOPIC.get(q.get('topic'), 'grandeurs')
        m = re.match(r'QCM hebdo promo (\d{4}) n°(\d+)', q.get('source', ''))
        src = 'QCM hebdo promo %s · n°%s' % (m.group(1), m.group(2)) if m else 'QCM hebdo'
        item = {'id': qid, 'topic': topic, 'lvl': int(q.get('difficulty') or 1), 'keep': True, 'src': src,
                'q': esc(q['question']), 'o': [esc(o) for o in q['options']], 'x': esc(q.get('explanation', '')), 'ref': REF[topic]}
        if q['id'] in SAME: item['same'] = SAME[q['id']]
        ans = q['answer']
        if q.get('multi') or (isinstance(ans, list) and len(ans) > 1):
            item['type'] = 'multi'; item['a'] = sorted(ans)
        else:
            item['type'] = 'single'; item['a'] = ans[0] if isinstance(ans, list) else ans
        fig = q.get('figure')
        if fig and fig.get('image'):
            name = os.path.basename(fig['image'])
            shutil.copyfile(os.path.join(AN, fig['image']), os.path.join(REPO, 'assets/img/qcm', name))
            item['img'] = 'assets/img/qcm/' + name
            item['alt'] = esc((fig.get('layout') or 'Schéma du circuit')[:300])
        out.append(item)
lines = []
for it in out:
    ref = it.pop('ref'); c, a = ref.split('#')
    img = it.pop('img', None); alt = it.pop('alt', None)
    js = json.dumps(it, ensure_ascii=False)
    js = js[:-1] + ', "ref": %s + "#%s"' % (c, a)
    if img: js += ', "fig": figImg(%s, %s)' % (json.dumps(img), json.dumps(alt, ensure_ascii=False))
    js += '}'
    lines.append('    ' + js)
src = '''/* Questions d’électronique des QCM hebdomadaires des promos précédentes (2026 à 2030), extraites et corrigées.
   Réponses résolues et vérifiées par calcul (pas de corrigé officiel publié pour ces QCM). Généré par tools/gen_hebdo.py. */
(function () {
  var B = window.QCM_BANK = window.QCM_BANK || [];
  var C1 = 'elec/cours-1-bases.html', C2 = 'elec/cours-2-lois.html', C3 = 'elec/cours-3-theoremes.html';
  function figImg(p, alt) { return '<img class="scan" src="' + (window.REV ? REV.url(p) : p) + '" alt="' + alt.replace(/"/g, '&quot;') + '" loading="lazy">'; }
  var Q = [
%s
  ];
  Q.forEach(function (q) { q.s = 'elec'; });
  Array.prototype.push.apply(B, Q);
})();
''' % ',\n'.join(lines)
open(os.path.join(REPO, 'data/qcm/elec-hebdo.js'), 'w', encoding='utf8').write(src)
from collections import Counter
print(len(out), 'questions ;', Counter(i['topic'] for i in out))
