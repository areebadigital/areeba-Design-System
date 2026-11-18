import { A, h, doc } from '../areeba.js';
import readme from '../../components/Pagination/README.md?raw';

export default {
  title: 'Components/Navigation/Pagination',
  component: A.Pagination,
  parameters: doc(readme),
  args: { page: 2, total: 1284, pageSize: 25 },
  argTypes: {
    page: { control: { type: 'number', min: 1 }, description: '1-based current page.' },
    pageCount: { control: 'number', description: 'Number of pages (or give `total` and `pageSize`).' },
    total: { control: 'number' }, pageSize: { control: 'number' },
    onChange: { action: 'changed', description: '`(page)`' },
  },
};

export const Playground = {};
export const Interactive = { name: 'Try it', render: function Pager() { const [p, setP] = window.React.useState(1); return h(A.Pagination, { page: p, total: 1284, pageSize: 25, onChange: setP }); } };
export const FewPages = { name: 'Few pages', args: { page: 1, total: undefined, pageSize: undefined, pageCount: 3 } };
