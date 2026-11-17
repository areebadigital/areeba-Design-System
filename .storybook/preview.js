import '../tokens.css';
import '../components/bundle.css';
import './preview.css';
import '../stories/areeba.js';

/** Light / dark switch in the toolbar. Sets data-theme on <html>, exactly as an app would. */
export const globalTypes = {
  theme: {
    description: 'Colour theme',
    toolbar: { title: 'Theme', icon: 'mirror', items: [{ value: 'light', title: 'Light' }, { value: 'dark', title: 'Dark' }], dynamicTitle: true },
  },
};
export const initialGlobals = { theme: 'light' };

const withTheme = (Story, ctx) => {
  document.documentElement.setAttribute('data-theme', ctx.globals.theme || 'light');
  return Story();
};

export default {
  decorators: [withTheme],
  parameters: {
    layout: 'padded',
    backgrounds: { disable: true },
    controls: { expanded: true, sort: 'requiredFirst' },
    a11y: { test: 'error' },
    options: { storySort: { order: ['Introduction', 'Foundations', ['Colour', 'Typography', 'Spacing and shape', 'Logos', 'Icons'], 'Components', ['Actions', 'Inputs', 'Status', 'Data display', 'Charts', 'Navigation', 'Overlays']] } },
  },
  tags: ['autodocs'],
};
