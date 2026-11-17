import { A, h, doc } from '../areeba.js';
import readme from '../../components/EmptyState/README.md?raw';

export default {
  title: 'Components/Status/EmptyState',
  component: A.EmptyState,
  parameters: doc(readme),
  args: { title: 'No transactions yet', children: 'When customers pay with areeba, their payments show up here in real time.' },
  argTypes: {
    title: { control: 'text' },
    children: { control: 'text', description: 'One or two sentences on what will appear and why.' },
    action: { control: false, description: 'Usually one primary Button that starts the first task.' },
  },
  render: (args) => h(A.EmptyState, { ...args, action: h(A.Button, null, 'Accept your first payment') }),
};

export const Playground = {};
export const NoResults = { name: 'No search results', args: { title: 'No matches for “Hamra”', children: 'Check the spelling or clear the filters.' }, render: (args) => h(A.EmptyState, { ...args, action: h(A.Button, { variant: 'secondary' }, 'Clear filters') }) };
