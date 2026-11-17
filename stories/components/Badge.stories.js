import { A, h, doc, row } from '../areeba.js';
import readme from '../../components/Badge/README.md?raw';

export default {
  title: 'Components/Status/Badge',
  component: A.Badge,
  parameters: doc(readme),
  args: { children: 'Completed', tone: 'success', dot: true },
  argTypes: {
    children: { control: 'text', description: 'Always a word: colour is never the only signal.' },
    tone: { control: 'inline-radio', options: ['neutral', 'brand', 'success', 'warning', 'danger', 'info'], table: { defaultValue: { summary: 'neutral' } } },
    dot: { control: 'boolean', description: 'Leading status dot.' },
  },
};

export const Playground = {};
export const Tones = { render: () => row(h(A.Badge, { tone: 'success', dot: true }, 'Completed'), h(A.Badge, { tone: 'warning', dot: true }, 'Pending'), h(A.Badge, { tone: 'danger', dot: true }, 'Declined'), h(A.Badge, { tone: 'info' }, 'Refund'), h(A.Badge, { tone: 'brand' }, 'New'), h(A.Badge, null, 'Draft')) };
