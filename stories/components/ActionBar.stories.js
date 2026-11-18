import { A, h, doc } from '../areeba.js';
import readme from '../../components/ActionBar/README.md?raw';

export default {
  title: 'Components/Actions/ActionBar',
  component: A.ActionBar,
  parameters: doc(readme),
  args: { stacked: false },
  render: (args) => h('div', { style: { maxWidth: 390 } }, h(A.ActionBar, args, h(A.Button, null, 'Continue'))),
};

export const Playground = {};
export const Stacked = { render: () => h('div', { style: { maxWidth: 390 } }, h(A.ActionBar, { stacked: true }, h(A.Button, null, 'Share receipt'), h(A.Button, { variant: 'secondary' }, 'Report a problem'))) };
