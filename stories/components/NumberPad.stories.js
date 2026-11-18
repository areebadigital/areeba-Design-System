import { A, h, doc } from '../areeba.js';
import readme from '../../components/NumberPad/README.md?raw';

export default {
  title: 'Components/Inputs/NumberPad',
  component: A.NumberPad,
  parameters: doc(readme),
  args: { decimal: true },
  render: (args) => h('div', { style: { maxWidth: 340 } }, h(A.NumberPad, args)),
};

export const Playground = {};

