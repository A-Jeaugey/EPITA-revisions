// Capture d’éléments précis d’une page (voir tools/README dans CLAUDE.md).
// Capture d'éléments précis : node elshot.js URL "sel1|sel2" outprefix [clicks "sel:n,sel:n"] [scheme]
const { chromium } = require('playwright');
(async () => {
  const [url, sels, out, clicks, scheme] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 }, colorScheme: scheme || 'light' });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(url, { waitUntil: 'networkidle' });
  if (clicks) for (const c of clicks.split(',')) { const [s, n] = c.split(':'); for (let i = 0; i < (+n || 1); i++) await p.click(s); }
  let k = 0;
  for (const s of sels.split('|')) { const el = await p.$(s); if (!el) { console.log('missing', s); continue; } await el.scrollIntoViewIfNeeded(); await el.screenshot({ path: `${out}-${k++}.png` }); }
  console.log('errors:', errs.length ? errs : 'none');
  await b.close();
})();
