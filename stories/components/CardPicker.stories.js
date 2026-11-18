import { A, h, doc } from '../areeba.js';
import readme from '../../components/CardPicker/README.md?raw';

export default {
  title: 'Components/Inputs/CardPicker',
  component: A.CardPicker,
  parameters: doc(readme),
  args: { label: 'From this card', defaultValue: '5678', cards: [{ value: '5678', last4: '5678', balance: '$1,395.72' }, { value: '9101', last4: '9101', balance: '$240.10', variant: 'brand' }, { value: '1121', last4: '1121', note: 'Supplementary', disabled: true }] },
  render: (args) => h('div', { style: { maxWidth: 360 } }, h(A.CardPicker, args)),
};

export const Playground = {};

