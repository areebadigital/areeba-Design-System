import '../tokens.css';
import '../components/bundle.css';
import './preview.css';
import '../stories/areeba.js';
import theme from './theme.js';
import { tDeep } from '../stories/i18n.js';

/** Light / dark switch in the toolbar. Sets data-theme on <html>, exactly as an app would. */
export const globalTypes = {
  theme: {
    description: 'Colour theme',
    toolbar: { title: 'Theme', icon: 'mirror', items: [{ value: 'light', title: 'Light' }, { value: 'dark', title: 'Dark' }], dynamicTitle: true },
  },
  dir: {
    description: 'Text direction (Arabic is right-to-left)',
    toolbar: { title: 'Direction', icon: 'transfer', items: [{ value: 'ltr', title: 'Left to right' }, { value: 'rtl', title: 'Right to left (Arabic)' }], dynamicTitle: true },
  },
};
export const initialGlobals = { theme: 'light', dir: 'ltr' };

const withTheme = (Story, ctx) => {
  const html = document.documentElement;
  html.setAttribute('data-theme', ctx.globals.theme || 'light');
  /* An app sets dir and lang on <html>; components read direction from there. */
  const rtl = ctx.globals.dir === 'rtl';
  html.setAttribute('dir', rtl ? 'rtl' : 'ltr');
  html.setAttribute('lang', rtl ? 'ar' : 'en');
  /* In RTL, stories show Arabic copy: args are translated too (card faces stay Latin). */
  if (rtl && ctx.component !== window.Areeba.PaymentCard) return Story({ args: tDeep(ctx.args) });
  return Story();
};

export default {
  decorators: [withTheme],
  parameters: {
    layout: 'padded',
    docs: { theme },
    backgrounds: { disable: true },
    controls: { expanded: true, sort: 'requiredFirst' },
    a11y: { test: 'error' },
    options: { storySort: { order: ['Introduction', 'Foundations', ['Colour', 'Typography', 'Spacing and shape', 'Logos', 'Icons'], 'Components', ['Actions', 'Inputs', 'Status', 'Data display', 'Charts', 'Navigation', 'Overlays'], 'Blocks', ['Introduction', 'Mobile', 'SaaS'], 'Guides'] } },
  },
  tags: ['autodocs'],
};
