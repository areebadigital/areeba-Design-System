import { A, h, doc } from '../areeba.js';
import readme from '../../components/AppHeader/README.md?raw';

export default {
  title: 'Components/Navigation/AppHeader',
  component: A.AppHeader,
  parameters: doc(readme),
  args: { title: 'Activity' },
  render: (args) => h('div', { style: { maxWidth: 390 } }, h(A.AppHeader, Object.assign({ start: h(A.IconButton, { icon: 'back', label: 'Back' }), end: h(A.IconButton, { icon: 'download', label: 'Download statement' }) }, args))),
};

export const Playground = {};
export const Modal = { name: 'Sheet (modal)', render: () => h('div', { style: { maxWidth: 390 } }, h(A.AppHeader, { variant: 'modal', title: 'Top up', subtitle: 'To •••• 1395', start: h(A.IconButton, { icon: 'back', label: 'Back' }), end: h(A.IconButton, { icon: 'close', label: 'Close' }) })) };
export const Home = { name: 'Home', render: () => h('div', { style: { maxWidth: 390 } }, h(A.AppHeader, { title: 'My cards', start: h(A.IconButton, { icon: 'user', label: 'Profile' }), end: h(A.IconButton, { icon: 'bell', label: 'Notifications, 2 unread', badge: true }) })) };
