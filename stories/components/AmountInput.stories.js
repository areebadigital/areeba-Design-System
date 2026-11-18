import { A, h, doc } from '../areeba.js';
import readme from '../../components/AmountInput/README.md?raw';

export default {
  title: 'Components/Inputs/AmountInput',
  component: A.AmountInput,
  parameters: doc(readme),
  args: { label: 'Amount', defaultValue: '100', fee: 0, hint: 'Min $20 · Max $2,500' },
};

export const Playground = {};
export const OverLimit = { name: 'Over the limit', args: { defaultValue: '3000', error: 'The maximum top up is $2,500.' } };
export const WithNumberPad = { name: 'With the number pad', render: function Pad() { const [v, setV] = window.React.useState('100'); return h('div', { style: { maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 24 } }, h(A.AmountInput, { label: 'Amount', value: v, readOnly: true, fee: 0, hint: 'Min $20 · Max $2,500' }), h(A.NumberPad, { decimal: true, onKey: (k) => setV(A.padInput(v, k)) })); } };
