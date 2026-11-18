import { A, h, doc } from '../areeba.js';
import readme from '../../components/DetailList/README.md?raw';

export default {
  title: 'Components/Data display/DetailList',
  component: A.DetailList,
  parameters: doc(readme),
  args: { items: [{ label: 'Total', value: '$100.00', ltr: true, emphasis: true }, { label: 'From card', value: '•••• 5678', ltr: true, icon: 'card' }, { label: 'To card', value: '•••• 1395', ltr: true, icon: 'card' }, { label: 'Transaction fee', value: 'Free', icon: 'doc' }] },
  render: (args) => h('div', { style: { maxWidth: 360 } }, h(A.DetailList, args)),
};

export const Playground = {};
export const WithStatus = { name: 'With status', render: () => h('div', { style: { maxWidth: 360 } }, h(A.DetailList, { items: [{ label: 'Card', value: '•••• 9803', ltr: true }, { label: 'Original amount', value: '€70.00', ltr: true }, { label: 'Status', value: h(A.Badge, { tone: 'warning', dot: true }, 'Pending') }, { label: 'Type', value: h(A.Badge, { icon: 'globe' }, 'Online') }] })) };
