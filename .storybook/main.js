/** Storybook for the areeba design system. Components come from the real bundle (components/bundle.js). */
export default {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  staticDirs: [{ from: '../assets', to: '/assets' }],
  docs: { defaultName: 'Docs' },
  core: { disableTelemetry: true },
};
