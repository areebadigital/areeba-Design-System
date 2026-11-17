// Every Storybook story, in light, dark and right-to-left (Arabic), checked four ways:
//   1. screenshot matches its reference in __screenshots__/
//   2. no page errors or console errors
//   3. no axe accessibility violations
//   4. no horizontal overflow; in RTL, no English left on screen (Arabic copy comes from stories/i18n.js)
// Stories are read from the built Storybook (storybook-static/index.json), so new stories are tested
// automatically. Files are served straight from disk, so no web server is needed.
import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const ROOT = path.resolve('storybook-static');
const AXE = createRequire(import.meta.url).resolve('axe-core/axe.min.js');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.md': 'text/markdown' };

if (!fs.existsSync(path.join(ROOT, 'index.json'))) throw new Error('storybook-static/ is missing: run `npm run build-storybook` first.');
const stories = Object.values(JSON.parse(fs.readFileSync(path.join(ROOT, 'index.json'), 'utf8')).entries)
  .filter((e) => e.type === 'story' && (e.id.startsWith('components-') || e.id.startsWith('guides-')))
  .map((e) => e.id).sort();

/* The guides page is always RTL, so it runs in light and dark only. */
const MODES = [{ name: 'light', theme: 'light', dir: 'ltr' }, { name: 'dark', theme: 'dark', dir: 'ltr' }, { name: 'rtl', theme: 'light', dir: 'rtl' }];
const modesFor = (id) => (id.startsWith('guides-') ? [{ name: 'light', theme: 'light', dir: 'rtl' }, { name: 'dark', theme: 'dark', dir: 'rtl' }] : MODES);

/* Latin words allowed on an Arabic screen: brand and currency codes, card faces (which stay Latin by design), IDs. */
const LATIN_OK = /^(areeba|CSV|QR|USD|LBP|EUR|GBP|VISA|Visa|MC|IBAN|LB\d+|txn_\w+|k|M|Lina|Haddad|Rami|Khoury|RAMI|KHOURY)$/;

test.beforeEach(async ({ context }) => {
  await context.route('http://sb.local/**', (route) => {
    let f = path.join(ROOT, decodeURIComponent(new URL(route.request().url()).pathname));
    if (f.endsWith(path.sep)) f = path.join(f, 'index.html');
    if (!f.startsWith(ROOT) || !fs.existsSync(f)) return route.fulfill({ status: 404, body: '' });
    return route.fulfill({ status: 200, contentType: TYPES[path.extname(f)] || 'application/octet-stream', body: fs.readFileSync(f) });
  });
  await context.route(/^https?:\/\/(?!sb\.local)/, (route) => route.abort()); // nothing leaves the machine
});

for (const id of stories) {
  for (const mode of modesFor(id)) {
    test(`${id} · ${mode.name}`, async ({ page }) => {
      // "Today" is fixed so calendars render the same every day.
      await page.clock.setFixedTime(new Date('2026-11-17T10:00:00+02:00'));
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });

      await page.goto(`http://sb.local/iframe.html?id=${id}&viewMode=story&globals=theme:${mode.theme};dir:${mode.dir}`);
      await page.locator('#storybook-root > *').first().waitFor();
      await page.evaluate(() => document.fonts.ready);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(300); // charts measure their container once after mount

      expect.soft(await page.evaluate(() => [document.documentElement.dataset.theme, document.documentElement.dir]), 'theme and direction applied').toEqual([mode.theme, mode.dir]);

      await page.addScriptTag({ path: AXE });
      const violations = await page.evaluate(async () => (await window.axe.run('#storybook-root', { resultTypes: ['violations'] })).violations
        .map((v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(', ')}`));
      expect.soft(violations, 'axe accessibility violations').toEqual([]);

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect.soft(overflow, 'horizontal overflow (px)').toBeLessThanOrEqual(1);

      if (mode.dir === 'rtl') {
        const latin = await page.evaluate(() => {
          const root = document.querySelector('#storybook-root'), out = new Set(), add = (s) => (s || '').match(/[A-Za-z_][A-Za-z0-9_]*/g)?.forEach((w) => out.add(w));
          const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); while (tw.nextNode()) add(tw.currentNode.nodeValue);
          root.querySelectorAll('[aria-label],[placeholder],input').forEach((el) => { add(el.getAttribute('aria-label')); add(el.getAttribute('placeholder')); add(el.value); });
          return [...out];
        });
        expect.soft(latin.filter((w) => !LATIN_OK.test(w)), 'English left on an RTL screen: add it to stories/i18n.js').toEqual([]);
      }

      expect.soft(errors, 'page and console errors').toEqual([]);
      await expect(page).toHaveScreenshot(`${id}--${mode.name}.png`, { fullPage: true });
    });
  }
}
