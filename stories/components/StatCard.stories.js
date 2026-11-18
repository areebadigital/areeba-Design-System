import { A, h, doc } from '../areeba.js';
import readme from '../../components/StatCard/README.md?raw';

export default {
  title: 'Components/Data display/StatCard',
  component: A.StatCard,
  parameters: doc(readme),
  args: { label: 'Volume', value: '$186,420', change: { direction: 'up', value: '+12.4%', label: 'vs October', good: true } },
  render: (args) => h('div', { style: { maxWidth: 260 } }, h(A.StatCard, args)),
};

export const Playground = {};
export const Row = { render: () => h('div', { className: 'ar-stats' }, h(A.StatCard, { label: 'Volume', value: '$186,420', change: { direction: 'up', value: '+12.4%', label: 'vs October', good: true } }), h(A.StatCard, { label: 'Transactions', value: '1,284', change: { direction: 'up', value: '+8.1%', label: 'vs October', good: true } }), h(A.StatCard, { label: 'Refunds', value: '$2,310', change: { direction: 'down', value: '−18%', label: 'vs October', good: true } })) };
