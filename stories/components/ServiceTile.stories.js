import { A, h, doc } from '../areeba.js';
import readme from '../../components/ServiceTile/README.md?raw';

export default {
  title: 'Components/Actions/ServiceTile',
  component: A.ServiceTile,
  parameters: doc(readme),
  args: { initials: 'A', label: 'Alfa', description: 'Recharge vouchers', tone: 'brand' },
  render: (args) => h('div', { style: { maxWidth: 200 } }, h(A.ServiceTile, args)),
};

export const Playground = {};
export const Grid = { render: () => h('div', { className: 'ar-tiles', style: { maxWidth: 380 } }, h(A.ServiceTile, { initials: 'A', label: 'Alfa', description: 'Recharge vouchers', tone: 'brand' }), h(A.ServiceTile, { initials: 'T', label: 'touch', description: 'Recharge vouchers', tone: 'info' }), h(A.ServiceTile, { initials: 'O', label: 'Ogero', description: 'Internet and landline', tone: 'success' }), h(A.ServiceTile, { icon: 'store', label: 'Gift cards', description: 'Streaming and games', tone: 'warning' })) };
