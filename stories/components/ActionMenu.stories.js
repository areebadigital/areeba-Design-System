import { A, h, doc } from '../areeba.js';
import readme from '../../components/ActionMenu/README.md?raw';

export default {
  title: 'Components/Actions/ActionMenu',
  component: A.ActionMenu,
  parameters: doc(readme),
  args: { label: 'Card actions', items: [{ label: 'Lock card', icon: 'lock' }, { label: 'View PIN', icon: 'pin' }, { label: 'Mark as favourite', icon: 'star', disabled: true }, { label: 'View card info', icon: 'card' }, { label: 'Report stolen or missing', icon: 'alert', danger: true }] },
  render: (args) => h('div', { style: { minHeight: 320, display: 'flex', justifyContent: 'flex-end' } }, h(A.ActionMenu, args)),
};

export const Playground = {};

