import { A, h, doc } from '../areeba.js';
import readme from '../../components/Balance/README.md?raw';

export default {
  title: 'Components/Data display/Balance',
  component: A.Balance,
  parameters: doc(readme),
  args: { amount: '$1,395.72' },
};

export const Playground = {};
export const Hidden = { args: { defaultHidden: true } };
