import { create } from 'storybook/theming';

/** areeba branding for the Storybook UI and docs pages (values from tokens.json, light theme). */
export default create({
  base: 'light',
  brandTitle: 'areeba design system',
  brandImage: '/assets/Logos/areeba-logo.svg',
  brandTarget: '_self',
  colorPrimary: '#630c0c',
  colorSecondary: '#630c0c',
  appBg: '#f3f2ef',
  appContentBg: '#ffffff',
  appBorderColor: '#e0dfdd',
  appBorderRadius: 4,
  textColor: '#131210',
  textMutedColor: '#131210cc',
  barSelectedColor: '#630c0c',
  fontBase: '"Plus Jakarta Sans", Arial, system-ui, sans-serif',
  fontCode: '"IBM Plex Mono", ui-monospace, Menlo, monospace',
});
