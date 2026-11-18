/* Shared Storybook setup for blocks: a phone frame and a docs page that shows the block's full source,
   ready to copy (the code shown is the file itself, imported with ?raw, so it is always what runs). */
import '../areeba.js';

export const phone = (Story) => (
  <div style={{ width: 390, minHeight: 844, display: 'flex', flexDirection: 'column', border: '1px solid var(--line)', borderRadius: 28, overflow: 'hidden', background: 'var(--surface-sunken)', margin: '0 auto' }}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}><Story /></div>
  </div>
);

export const blockParams = (source, description) => ({
  layout: 'padded',
  docs: {
    description: { component: description + '\n\nCopy the code below into your app. It uses only `window.Areeba` components and tokens, and carries its English and Arabic copy, picked from `<html lang>`.' },
    source: { code: source, language: 'jsx' },
    canvas: { sourceState: 'shown' },
  },
});
