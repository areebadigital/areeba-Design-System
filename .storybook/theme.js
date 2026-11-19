import { create } from 'storybook/theming';

/** areeba Asterisk 4 branding for the Storybook UI and docs pages (values from tokens.json, light theme). */
export default create({
  base: 'light',
  brandTitle: '<span style="display:inline-flex;align-items:center;gap:10px;font-weight:600;font-size:15px;color:#131210"><img src="assets/Logos/asterisk-mark.svg" width="28" height="28" alt="">areeba Asterisk 4</span>',
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
