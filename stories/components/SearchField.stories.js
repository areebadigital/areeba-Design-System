import { A, h, doc } from '../areeba.js';
import readme from '../../components/SearchField/README.md?raw';

export default {
  title: 'Components/Inputs/SearchField',
  component: A.SearchField,
  parameters: doc(readme),
  args: { label: 'Search transactions', placeholder: 'Search by merchant or name' },
  render: (args) => h('div', { style: { maxWidth: 360 } }, h(A.SearchField, args)),
};

export const Playground = {};
export const WithText = { name: 'With text', args: { defaultValue: 'Spinneys' } };
