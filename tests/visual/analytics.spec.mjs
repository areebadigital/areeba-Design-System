// Analytics contract: components send the standard events through AsteriskProvider, tag managers get
// data-analytics-id, and no event ever carries what people typed or see (amounts, IBANs, names, codes).
// Renders real components from the built Storybook (storybook-static/), so run `npm run build-storybook` first.
import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('storybook-static');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const SECRETS = ['LB62 0999 0000 0001', '$1,240.50', 'Sara Ali', '481926', 'private-note', 'secret.pdf'];

test.beforeEach(async ({ context }) => {
  await context.route('http://sb.local/**', (route) => {
    const f = path.join(ROOT, decodeURIComponent(new URL(route.request().url()).pathname));
    if (!f.startsWith(ROOT) || !fs.existsSync(f)) return route.fulfill({ status: 404, body: '' });
    return route.fulfill({ status: 200, contentType: TYPES[path.extname(f)] || 'application/octet-stream', body: fs.readFileSync(f) });
  });
  await context.route(/^https?:\/\/(?!sb\.local)/, (route) => route.abort());
});

test('components send standard, private analytics events', async ({ page }) => {
  await page.goto('http://sb.local/iframe.html?id=components-actions-button--playground&viewMode=story');
  await page.locator('#storybook-root > *').first().waitFor();
  await page.evaluate((secrets) => {
    const A = window.Areeba, h = window.React.createElement;
    window.__events = [];
    const box = document.createElement('div'); box.id = 'analytics-test'; document.body.appendChild(box);
    function App() {
      const [open, setOpen] = window.React.useState(false);
      return h(A.AsteriskProvider, { analytics: (e) => window.__events.push(e), screen: 'test' },
        h(A.Button, { analyticsId: 'test.pay', onClick: () => setOpen(true) }, 'Pay ' + secrets[1]),
        h(A.Switch, { analyticsId: 'test.freeze', label: 'Freeze ' + secrets[2] }),
        h(A.Tabs, { analyticsId: 'test.period', label: 'Period', items: [{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }] }),
        h(A.TextField, { analyticsId: 'test.iban', label: 'IBAN', defaultValue: secrets[0], error: 'Too short' }),
        h(A.CodeInput, { analyticsId: 'test.code', defaultValue: secrets[3] }),
        h(A.TextArea, { analyticsId: 'test.note', label: 'Note', defaultValue: secrets[4] }),
        h(A.Dialog, { open, title: 'Confirm', onClose: () => setOpen(false) }, 'Body'));
    }
    window.ReactDOM.render(h(App), box);
  }, SECRETS);

  const root = page.locator('#analytics-test');
  await expect(root.locator('[data-analytics-id="test.pay"]')).toHaveAttribute('data-analytics-component', 'Button');
  await root.locator('[data-analytics-id="test.pay"]').click();
  await expect(page.getByRole('dialog')).toBeVisible();
  // The dialog listens for Escape once focus has moved in.
  await page.waitForFunction(() => { const d = document.querySelector('[role="dialog"]'); return d && d.contains(document.activeElement); });
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await root.locator('[data-analytics-id="test.freeze"]').click();
  await root.getByRole('tab', { name: 'Week' }).click();

  const events = await page.evaluate(() => window.__events);
  const names = events.map((e) => e.name);
  expect(names).toEqual(expect.arrayContaining([
    'asterisk.field.error_shown', 'asterisk.button.press', 'asterisk.dialog.open', 'asterisk.switch.change', 'asterisk.tabs.change', 'asterisk.dialog.close',
  ]));
  const press = events.find((e) => e.name === 'asterisk.button.press');
  expect(press).toMatchObject({ component: 'Button', action: 'press', analyticsId: 'test.pay', screen: 'test', variant: 'primary' });
  expect(events.find((e) => e.name === 'asterisk.switch.change')).toMatchObject({ checked: true });
  expect(events.find((e) => e.name === 'asterisk.tabs.change')).toMatchObject({ value: 'week' });
  expect(events.find((e) => e.name === 'asterisk.dialog.close')).toMatchObject({ how: 'escape' });
  expect(events.find((e) => e.name === 'asterisk.field.error_shown')).toMatchObject({ component: 'TextField', analyticsId: 'test.iban' });

  // Nothing people typed or see leaves the component.
  const json = JSON.stringify(events);
  for (const s of SECRETS) expect(json, `event leaked "${s}"`).not.toContain(s);
  // analyticsId / analyticsData never reach the DOM as unknown attributes.
  expect(await root.locator('[analyticsid], [analyticsdata]').count()).toBe(0);
});

test('without a provider nothing is sent and nothing breaks', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('http://sb.local/iframe.html?id=components-actions-button--playground&viewMode=story');
  await page.locator('#storybook-root button').first().click();
  expect(errors).toEqual([]);
});
