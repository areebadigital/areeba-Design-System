import { A, h, doc, row } from '../areeba.js';
import readme from '../../components/FilterChip/README.md?raw';

export default {
  title: 'Components/Inputs/FilterChip',
  component: A.FilterChip,
  parameters: doc(readme),
  args: { label: 'Money in', selected: true },
};

export const Playground = {};
export const Row = { name: 'Filter row', render: () => row(h(A.FilterChip, { label: '1–30 Nov', hasPopup: 'dialog' }), h(A.FilterChip, { label: '•••• 9803', hasPopup: 'listbox' }), h(A.FilterChip, { label: 'Money in', selected: true }), h(A.FilterChip, { label: 'Money out' })) };
