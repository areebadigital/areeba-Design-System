import { A, h, doc } from '../areeba.js';
import readme from '../../components/CopyCode/README.md?raw';

export default {
  title: 'Components/Data display/CopyCode',
  component: A.CopyCode,
  parameters: doc(readme),
  args: { label: 'Recharge code', code: '3FBV 953N DN71' },
  render: (args) => h('div', { style: { maxWidth: 360 } }, h(A.CopyCode, args)),
};

export const Playground = {};

