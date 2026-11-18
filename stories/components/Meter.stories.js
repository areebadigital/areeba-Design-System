import { A, h, doc } from '../areeba.js';
import readme from '../../components/Meter/README.md?raw';

export default {
  title: 'Components/Status/Meter',
  component: A.Meter,
  parameters: doc(readme),
  args: { label: 'Monthly limit', value: 3200, max: 5000, valueText: '$3,200 of $5,000', hint: 'Resets on 1 December' },
  argTypes: {
    value: { control: { type: 'number', min: 0 } }, max: { control: 'number' },
    valueText: { control: 'text', description: 'Shown and read out; say the numbers.' },
    tone: { control: 'inline-radio', options: ['brand', 'success', 'warning', 'danger'], description: 'Defaults by fill: brand, warning from 75%, danger from 90%.' },
  },
  render: (args) => h('div', { style: { maxWidth: 420 } }, h(A.Meter, args)),
};

export const Playground = {};
export const Levels = {
  render: () => h('div', { style: { maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 24 } },
    h(A.Meter, { label: 'Monthly limit', value: 3200, max: 5000, valueText: '$3,200 of $5,000' }),
    h(A.Meter, { label: 'Monthly limit', value: 4100, max: 5000, valueText: '$4,100 of $5,000', hint: 'Close to your limit' }),
    h(A.Meter, { label: 'Monthly limit', value: 4800, max: 5000, valueText: '$4,800 of $5,000', hint: 'Payments stop at $5,000' }),
    h(A.Meter, { label: 'Account set-up', value: 3, max: 5, valueText: '3 of 5 steps', tone: 'success' })),
};
