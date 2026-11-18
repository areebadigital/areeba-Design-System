import { A, h, doc } from '../areeba.js';
import readme from '../../components/PasscodeDots/README.md?raw';

export default {
  title: 'Components/Inputs/PasscodeDots',
  component: A.PasscodeDots,
  parameters: doc(readme),
  args: { length: 6, filled: 4 },
};

export const Playground = {};
export const Wrong = { args: { filled: 6, error: 'Wrong passcode. 2 tries left.' } };
