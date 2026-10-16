// Vérification des pages : erreurs console, débordement horizontal (bureau 1280 px et mobile 375 px, clair et sombre).
// Usage : NODE_PATH=$(npm root -g) node tools/check.js http://127.0.0.1:8765/ "index.html,qcm/index.html" ./shots [shots]
// Charge des pages du site, relève erreurs console/page, débordement horizontal, et fait des captures.
const { chromium } = require('playwright');
const base = process.argv[2];
const pages = process.argv[3].split(',');
const outDir = process.argv[4];
const shots = process.argv[5] === 'shots';
(async () => {
  const browser = await chromium.launch();
  for (const vp of [{ w: 1280, h: 900, n: 'desk' }, { w: 375, h: 800, n: 'mob' }]) {
    for (const scheme of ['light', 'dark']) {
      if (!shots && (vp.n === 'mob' && scheme === 'dark')) continue;
      const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: scheme });
      for (const p of pages) {
        const page = await ctx.newPage();
        const errs = [];
        page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.type() + ': ' + m.text()); });
        page.on('pageerror', e => errs.push('pageerror: ' + e.message));
        page.on('requestfailed', r => { const u = r.url(); if (!u.includes('fonts.g')) errs.push('reqfail: ' + u); });
        await page.goto(base + p, { waitUntil: 'networkidle' }).catch(e => errs.push('goto: ' + e.message));
        await page.waitForTimeout(400);
        const ov = await page.evaluate(() => {
          const w = document.documentElement.clientWidth; const bad = [];
          document.querySelectorAll('body *').forEach(el => { const r = el.getBoundingClientRect(); if (r.right > w + 1 && r.width > 0) { let p = el.parentElement, inScroll = false; while (p) { const s = getComputedStyle(p); if (/(auto|scroll|hidden)/.test(s.overflowX)) { inScroll = true; break; } p = p.parentElement; } if (!inScroll) bad.push((el.id ? '#' + el.id : el.tagName.toLowerCase() + '.' + (el.className && el.className.baseVal === undefined ? el.className : '')) + ' r=' + Math.round(r.right)); } });
          return { sw: document.documentElement.scrollWidth, w, bad: bad.slice(0, 6) };
        });
        console.log(`[${vp.n}/${scheme}] ${p}: scrollW=${ov.sw} vw=${ov.w}${ov.sw > ov.w ? ' OVERFLOW ' + JSON.stringify(ov.bad) : ''}`);
        errs.forEach(e => console.log('   ' + e));
        if (shots) { const f = outDir + '/' + p.replace(/[\/.]/g, '_') + '-' + vp.n + '-' + scheme + '.png'; await page.screenshot({ path: f, fullPage: false }); }
        await page.close();
      }
      await ctx.close();
    }
  }
  await browser.close();
})();
