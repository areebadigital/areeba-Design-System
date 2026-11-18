import { A, h, doc } from '../areeba.js';
import readme from '../../components/NotificationItem/README.md?raw';

export default {
  title: 'Components/Status/NotificationItem',
  component: A.NotificationItem,
  parameters: doc(readme),
  args: { title: 'Fouad El Mir sent you $100.00', time: '12:10', unread: true, children: 'Note: Dinner on Friday' },
  render: (args) => h('div', { style: { maxWidth: 380 } }, h(A.NotificationItem, Object.assign({ avatar: h(A.Avatar, { initials: 'FM' }), actions: [h(A.Button, { key: 'd', variant: 'secondary', size: 'sm' }, 'Decline'), h(A.Button, { key: 'a', size: 'sm' }, 'Accept')] }, args))),
};

export const Playground = {};
export const Outcomes = { render: () => h('div', { style: { maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 12 } }, h(A.NotificationItem, { avatar: h(A.Avatar, { initials: 'FM' }), title: 'You accepted $100.00 from Fouad El Mir', time: 'Sun', status: { tone: 'success', label: 'Accepted' } }), h(A.NotificationItem, { icon: 'transfer', title: 'Transfer of $300.00 to John Daw returned', time: '09:41', status: { tone: 'warning', label: 'Expired' } }, 'It passed your 3-day limit, so it was declined and the money is back on your card.')) };
