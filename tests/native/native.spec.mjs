// React Native components on react-native-web: every theme and direction renders without errors or overflow,
// Arabic text stays right to left while numbers stay left to right, and analytics events are standard and private.
import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('packages/asterisk-native/demo/dist');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.woff2': 'font/woff2', '.css': 'text/css' };
const SECRETS = ['LB62 0999 0000', '$12,480.50', 'Sara Ali', 'SARA ALI', '1395'];

test.beforeEach(async ({ context }) => {
  await context.route('http://rn.local/**', (route) => {
    const f = path.join(ROOT, new URL(route.request().url()).pathname);
    if (!f.startsWith(ROOT) || !fs.existsSync(f)) return route.fulfill({ status: 404, body: '' });
    return route.fulfill({ status: 200, contentType: TYPES[path.extname(f)] || 'application/octet-stream', body: fs.readFileSync(f) });
  });
  await context.route(/^https?:\/\/(?!rn\.local)/, (route) => route.abort());
});

for (const q of ['theme=light&lang=en', 'theme=dark&lang=en', 'theme=light&lang=ar', 'theme=dark&lang=ar']) {
  const ar = q.includes('lang=ar');
  test(`renders cleanly: ${q}`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto('http://rn.local/index.html?' + q);
    await page.getByText(ar ? 'متابعة' : 'Continue').first().waitFor();
    await page.evaluate(() => document.fonts.ready);
    expect(errors).toEqual([]);
    // No text spills out of its box.
    const spills = await page.evaluate(() => [...document.querySelectorAll('div[dir], div, input, textarea')]
      .filter((el) => el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow !== 'visible' && el.clientWidth > 0)
      .map((el) => (el.innerText || el.placeholder || el.value || '').slice(0, 40)));
    expect(spills).toEqual([]);
    // The page uses the design system fonts, not a fallback.
    const families = await page.evaluate(() => [...new Set([...document.querySelectorAll('div')].map((d) => getComputedStyle(d).fontFamily))].join(' | '));
    expect(families).toMatch(ar ? /IBMPlexSansArabic/ : /PlusJakartaSans/);
    if (ar) {
      // Fields hold Arabic right to left, but the IBAN field stays left to right.
      const search = page.getByPlaceholder('البحث في المعاملات');
      expect(await search.evaluate((el) => getComputedStyle(el).direction)).toBe('rtl');
      const ibanValue = page.locator('input[value^="LB62"]');
      expect(await ibanValue.evaluate((el) => getComputedStyle(el).direction)).toBe('ltr');
    }
  });
}

test('analytics events are standard and private', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('http://rn.local/index.html?theme=light&lang=en');
  await page.getByText('Continue').first().waitFor();
  await page.locator('[data-testid="demo.freeze"]').click();
  await page.locator('[data-testid="demo.continue"]').click();
  const events = await page.evaluate(() => window.__events);
  const names = events.map((e) => e.name);
  expect(names).toEqual(expect.arrayContaining(['asterisk.field.error_shown', 'asterisk.switch.change', 'asterisk.button.press']));
  expect(events.find((e) => e.name === 'asterisk.button.press')).toMatchObject({ component: 'Button', analyticsId: 'demo.continue', screen: 'demo', platform: 'react-native', variant: 'primary' });
  expect(events.find((e) => e.name === 'asterisk.switch.change')).toMatchObject({ checked: false });
  expect(errors).toEqual([]);
  const json = JSON.stringify(events);
  for (const s of SECRETS) expect(json, `event leaked "${s}"`).not.toContain(s);
});
