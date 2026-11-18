import { A, h, doc, row } from '../areeba.js';
import readme from '../../components/IconButton/README.md?raw';

export default {
  title: 'Components/Actions/IconButton',
  component: A.IconButton,
  parameters: doc(readme),
  args: { icon: 'bell', label: 'Notifications, 2 unread', badge: true },
};

export const Playground = {};
export const Set = { name: 'In a header', render: () => row(h(A.IconButton, { icon: 'back', label: 'Back' }), h(A.IconButton, { icon: 'download', label: 'Download statement' }), h(A.IconButton, { icon: 'close', label: 'Close' }), h(A.IconButton, { icon: 'eye', label: 'Hide balance', variant: 'plain' })) };
