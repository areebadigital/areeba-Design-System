/** Storybook for the areeba design system. Components come from the real bundle (components/bundle.js, built from src/ by scripts/build.mjs). */
export default {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  staticDirs: [{ from: '../assets', to: '/assets' }, { from: '../fonts', to: '/fonts' }],
  docs: { defaultName: 'Docs' },
  core: { disableTelemetry: true },
};
