import { A, h, doc } from '../areeba.js';
import readme from '../../components/QuickAction/README.md?raw';

export default {
  title: 'Components/Actions/QuickAction',
  component: A.QuickAction,
  parameters: doc(readme),
  args: { icon: 'plus', label: 'Top up' },
};

export const Playground = {};
export const Row = { name: 'Quick actions row', render: () => h('div', { style: { maxWidth: 360 } }, h(A.QuickActions, { label: 'Card actions' }, h(A.QuickAction, { icon: 'plus', label: 'Top up' }), h(A.QuickAction, { icon: 'arrowUpRight', label: 'Send' }), h(A.QuickAction, { icon: 'lock', label: 'Lock' }), h(A.QuickAction, { icon: 'more', label: 'More' }))) };
