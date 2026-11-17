// Screenshot tests for every Storybook story: light, dark and right-to-left (Arabic).
// Run after `npm run build-storybook`:  npm run test:visual   (update references: npm run test:visual:update)
// Reference screenshots are generated in CI, in the Playwright container, so fonts and anti-aliasing
// match the machine that compares them. See tests/visual/README.md.
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/visual',
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',
  outputDir: 'test-results',
  fullyParallel: true,
  workers: process.env.CI ? 4 : undefined,
  retries: 0,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : [['list']],
  timeout: 60_000,
  expect: {
    toHaveScreenshot: {
      // A real change moves hundreds of pixels; this absorbs single-pixel anti-aliasing noise only.
      maxDiffPixels: 40,
      threshold: 0.2,
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
    },
  },
  use: {
    ...devices['Desktop Chrome'],
    viewport: { width: 1100, height: 800 },
    deviceScaleFactor: 1,
    locale: 'en-GB',
    timezoneId: 'Asia/Beirut',
  },
});
