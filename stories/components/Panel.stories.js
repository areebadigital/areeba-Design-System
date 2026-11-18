import { A, h, doc } from '../areeba.js';
import readme from '../../components/Panel/README.md?raw';

export default {
  title: 'Components/Data display/Panel',
  component: A.Panel,
  parameters: doc(readme),
  args: { title: 'Business details', description: 'Shown on receipts and invoices.' },
  argTypes: {
    title: { control: 'text', description: 'The panel heading (`h2`).' },
    description: { control: 'text', description: 'One line under the title.' },
    flush: { control: 'boolean', description: 'No body padding, for a table or list.' },
  },
  render: (args) => h('div', { style: { maxWidth: 560 } }, h(A.Panel, Object.assign({}, args, {
    actions: h(A.Button, { variant: 'ghost', size: 'sm' }, 'Edit'),
    footer: [h(A.Button, { key: 'c', variant: 'secondary' }, 'Cancel'), h(A.Button, { key: 's' }, 'Save changes')],
  }), h(A.DetailList, { items: [{ label: 'Business name', value: 'Green Grocer' }, { label: 'Country', value: 'Lebanon' }, { label: 'Settlement currency', value: 'USD' }] }))),
};

export const Playground = {};
export const WithTable = {
  name: 'With a table (flush)',
  render: () => h('div', { style: { maxWidth: 720 } }, h(A.Panel, { title: 'Recent payouts', flush: true, actions: h(A.Button, { variant: 'secondary', size: 'sm' }, 'View all') },
    h(A.DataTable, { rows: [{ d: '28 Nov', a: '$12,480.00', s: 'Paid' }, { d: '21 Nov', a: '$9,912.40', s: 'Paid' }], columns: [{ key: 'd', label: 'Date' }, { key: 's', label: 'Status', render: (r) => h(A.Badge, { tone: 'success', dot: true }, r.s) }, { key: 'a', label: 'Amount', align: 'right', numeric: true }] }))),
};
