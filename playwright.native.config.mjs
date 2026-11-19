// React Native components, rendered with react-native-web (packages/asterisk-native/demo).
// Run: npm run test:native  (builds the test page first). Checks errors, overflow, right-to-left and analytics.
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/native',
  outputDir: 'test-results/native',
  retries: 0,
  forbidOnly: !!process.env.CI,
  reporter: [['list']],
  timeout: 60_000,
  use: { ...devices['Desktop Chrome'], viewport: { width: 1180, height: 1000 }, deviceScaleFactor: 1, trace: 'off' },
});
