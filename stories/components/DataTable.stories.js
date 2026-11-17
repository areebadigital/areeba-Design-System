import { A, h, doc } from '../areeba.js';
import readme from '../../components/DataTable/README.md?raw';

const columns = [
  { key: 'id', label: 'Reference', mono: true }, { key: 'date', label: 'Date' }, { key: 'customer', label: 'Customer' },
  { key: 'status', label: 'Status', render: (r) => h(A.Badge, { tone: r.tone, dot: true }, r.status) },
  { key: 'amount', label: 'Amount', align: 'right', numeric: true },
];
const rows = [
  { id: 'txn_7Hq2LmA9', date: '16 Nov, 14:32', customer: 'Rami Khoury', status: 'Completed', tone: 'success', amount: '$1,250.00' },
  { id: 'txn_3Kd8PwQ1', date: '16 Nov, 11:05', customer: 'Lina Haddad', status: 'Pending', tone: 'warning', amount: '$89.90' },
  { id: 'txn_9Zr4TbE6', date: '15 Nov, 19:47', customer: 'Omar Saad', status: 'Declined', tone: 'danger', amount: '$420.00' },
];

export default {
  title: 'Components/Data display/DataTable',
  component: A.DataTable,
  parameters: doc(readme),
  args: { caption: 'Recent transactions', columns, rows, empty: 'No transactions in this period' },
  argTypes: {
    caption: { control: 'text' },
    columns: { control: false, description: '`{ key, label, align?, numeric?, mono?, render? }[]`. Amounts: align right, numeric.' },
    rows: { control: 'object' },
    empty: { control: 'text', description: 'Shown when rows is empty.' },
  },
};

export const Playground = {};
export const Empty = { args: { rows: [] } };
