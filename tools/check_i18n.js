// Vérifie la version anglaise du site, sans navigateur.
// Usage : node tools/check_i18n.js [--verbose]
//  1. Pages : chaque X.html a sa jumelle X.en.html (<html lang="en">), avec les mêmes id (les liens #ancre marchent
//     dans les deux langues) et, pour chaque fichier de données français chargé, son fichier data/en/… s'il existe.
//  2. Données : chaque fichier data/en/… ne vise que des id qui existent ; options de QCM en même nombre ;
//     liste des éléments français encore sans traduction et des textes restés identiques au français.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const verbose = process.argv.includes('--verbose');
let problems = 0;
const warn = (m) => { problems++; console.log('  ✗ ' + m); };
const info = (m) => console.log('  · ' + m);

/* ---------- 1. pages ---------- */
const PAGE_DIRS = ['', 'elec', 'taa', 'physique', 'caml', 'archi', 'maths', 'piloter', 'qcm', 'annales', 'fiches'];
const pages = [];
PAGE_DIRS.forEach(d => fs.readdirSync(path.join(ROOT, d)).forEach(f => { if (/\.html$/.test(f) && !/\.en\.html$/.test(f)) pages.push(path.join(d, f)); }));
const ids = html => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
const scripts = html => [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
console.log('Pages');
let twins = 0;
pages.forEach(p => {
  const en = p.replace(/\.html$/, '.en.html'), fe = path.join(ROOT, en);
  if (!fs.existsSync(fe)) { warn(`${en} manque`); return; }
  twins++;
  const hf = fs.readFileSync(path.join(ROOT, p), 'utf8'), he = fs.readFileSync(fe, 'utf8');
  if (!/<html lang="en"/.test(he)) warn(`${en} : <html lang="en"> absent`);
  const a = ids(hf), b = ids(he);
  const miss = [...a].filter(x => !b.has(x)), extra = [...b].filter(x => !a.has(x));
  if (miss.length) warn(`${en} : id absents de la version anglaise : ${miss.slice(0, 8).join(', ')}${miss.length > 8 ? '…' : ''}`);
  if (extra.length && verbose) info(`${en} : id en plus : ${extra.slice(0, 8).join(', ')}`);
  const se = scripts(he);
  scripts(hf).forEach(s => {
    if (!se.includes(s)) warn(`${en} : ne charge pas ${s}`);
    const m = /^((?:\.\.\/)*)data\/(.+\.js)$/.exec(s);
    if (m && fs.existsSync(path.join(ROOT, 'data/en', m[2]))) {
      const enS = m[1] + 'data/en/' + m[2];
      const i = se.indexOf(enS);
      if (i < 0) warn(`${en} : ne charge pas ${enS}`);
      else if (i < se.indexOf(s)) warn(`${en} : ${enS} doit venir après ${s}`);
    }
  });
});
console.log(`  ${twins} / ${pages.length} pages ont leur jumelle anglaise`);

/* ---------- 2. données ---------- */
// un window minimal avec le vrai core.js en mode anglais
const store = {};
const win = global;
win.window = win;
win.location = { pathname: '/x.en.html', href: 'http://site/x.en.html', search: '', hash: '', replace() {} };
win.localStorage = { getItem: k => store[k] || null, setItem: (k, v) => { store[k] = v; }, removeItem: k => { delete store[k]; } };
win.document = { currentScript: { src: 'http://site/assets/js/core.js' }, documentElement: { getAttribute: () => 'en', setAttribute() {}, removeAttribute() {} }, addEventListener() {} };
win.navigator = { languages: ['en'] };
win.addEventListener = () => {};
require(path.join(ROOT, 'assets/js/core.js'));
const R = win.REV;
const patches = []; // { file, target, map }
const realPatch = R.i18n.patch;
let curFile = '';
R.i18n.patch = (target, map, key) => { patches.push({ file: curFile, target, map, key: key || 'id', before: JSON.parse(JSON.stringify(target || null)) }); return realPatch(target, map, key); };
const load = rel => { curFile = rel; require(path.join(ROOT, rel)); };
const list = d => fs.existsSync(path.join(ROOT, d)) ? fs.readdirSync(path.join(ROOT, d)).filter(f => f.endsWith('.js')).sort() : [];

// tous les fichiers français, puis tous les fichiers anglais
win.QCM_BANK = []; win.QCM_TOPICS = {};
require(path.join(ROOT, 'assets/js/qcm-engine.js'));
['data', 'data/qcm', 'data/elec', 'data/taa', 'data/physique', 'data/caml', 'data/archi', 'data/maths'].forEach(d => list(d).forEach(f => load(path.join(d, f))));
const qcmFr = JSON.parse(JSON.stringify(win.QCM_BANK));
['data/en', 'data/en/qcm', 'data/en/elec', 'data/en/taa', 'data/en/physique', 'data/en/caml', 'data/en/archi', 'data/en/maths'].forEach(d => list(d).forEach(f => load(path.join(d, f))));

console.log('QCM');
const QEN = win.QCM_EN || {}, byId = {};
qcmFr.forEach(q => { byId[q.id] = q; });
Object.keys(QEN).forEach(id => {
  const q = byId[id], e = QEN[id];
  if (!q) { warn(`QCM_EN : id inconnu ${id}`); return; }
  if (e.o && q.o && e.o.length !== q.o.length) warn(`${id} : ${e.o.length} options en anglais, ${q.o.length} en français`);
  if (e.o && !q.o) warn(`${id} : options anglaises pour une question sans options`);
  if (q.q && !e.q) warn(`${id} : énoncé non traduit`);
  if (q.x && !e.x) warn(`${id} : explication non traduite`);
});
const bySubj = {};
qcmFr.forEach(q => { const s = q.s || '?'; bySubj[s] = bySubj[s] || { n: 0, en: 0, miss: [] }; bySubj[s].n++; if (QEN[q.id]) bySubj[s].en++; else bySubj[s].miss.push(q.id); });
Object.keys(bySubj).forEach(s => {
  const b = bySubj[s];
  (b.en < b.n ? warn : info)(`${s} : ${b.en} / ${b.n} questions traduites${b.miss.length ? ' (sans traduction : ' + b.miss.slice(0, 6).join(', ') + (b.miss.length > 6 ? '…' : '') + ')' : ''}`);
});
const TEN = win.QCM_TOPICS_EN || {};
const tMiss = Object.keys(win.QCM_TOPICS).filter(k => !TEN[k]);
(tMiss.length ? warn : info)(`notions : ${Object.keys(win.QCM_TOPICS).length - tMiss.length} / ${Object.keys(win.QCM_TOPICS).length} traduites${tMiss.length ? ' (manquent : ' + tMiss.slice(0, 8).join(', ') + ')' : ''}`);

console.log('Données patchées (exercices, sujets, notions)');
const FRENCHY = /[a-zàâçéèêëîïôûùüÿœ]{3,}/i;
const leaves = (o, p, out) => {
  if (typeof o === 'string') { out.push([p, o]); return out; }
  if (o && typeof o === 'object') Object.keys(o).forEach(k => leaves(o[k], p ? p + '.' + k : k, out));
  return out;
};
const SKIP_FIELD = /(^|\.)(id|exam|kind|key|topics|spec|svg|img|url|card|cat|cats|ref|type|unit|lvl|time|pts|order|official|same|also|keep|c|s|ecue|chk)(\.|$)/;
const groups = {};
patches.forEach(({ file, target, map, key, before }) => {
  if (!target) { warn(`${file} : cible absente (fichier français non chargé ?)`); return; }
  const g = groups[file] = groups[file] || { file, total: 0, done: 0, unknown: [], same: [], untouched: [] };
  if (Array.isArray(target)) {
    const known = new Set(before.map(o => o && o[key]));
    Object.keys(map).forEach(id => { if (!known.has(id)) g.unknown.push(id); });
    before.forEach((o, i) => {
      if (!o) return;
      g.total++;
      if (!map[o[key]]) { g.untouched.push(o[key]); return; }
      g.done++;
      const after = target[i];
      leaves(o, '', []).forEach(([p, v]) => {
        if (SKIP_FIELD.test(p) || /^(https?:|\.\.?\/|assets\/)/.test(v) || !FRENCHY.test(v.replace(/<[^>]+>/g, ''))) return;
        const now = p.split('.').reduce((n, k) => n == null ? n : n[k], after);
        if (now === v) g.same.push(o[key] + '.' + p);
      });
    });
  } else {
    Object.keys(map).forEach(k => { if (!(k in before)) g.unknown.push(k); });
    Object.keys(before).forEach(k => { g.total++; if (map[k] != null) g.done++; else g.untouched.push(k); });
  }
});
Object.values(groups).forEach(g => {
  console.log(`  ${g.file} : ${g.done} / ${g.total}`);
  if (g.unknown.length) warn(`${g.file} : id inconnus : ${g.unknown.slice(0, 8).join(', ')}`);
  if (g.untouched.length && verbose) info(`${g.file} : sans traduction : ${g.untouched.slice(0, 12).join(', ')}${g.untouched.length > 12 ? '…' : ''}`);
  if (g.same.length) (verbose ? warn : info)(`${g.file} : ${g.same.length} textes restés en français${verbose ? ' : ' + g.same.slice(0, 15).join(', ') : ' (--verbose pour la liste)'}`);
});
// éléments de données français sans aucun fichier anglais
const enFiles = new Set(Object.keys(groups).concat(list('data/en/qcm').map(f => 'data/en/qcm/' + f)).map(f => f.replace(/\\/g, '/')));
['data', 'data/qcm', 'data/elec', 'data/taa', 'data/physique', 'data/caml', 'data/archi', 'data/maths'].forEach(d => list(d).forEach(f => {
  const enf = (d.replace(/^data/, 'data/en') + '/' + f).replace(/\\/g, '/');
  if (!fs.existsSync(path.join(ROOT, enf))) warn(`${d}/${f} : pas de fichier ${enf}`);
}));
console.log(problems ? `\n${problems} point(s) à revoir` : '\nTout est en ordre');
process.exit(problems ? 1 : 0);
