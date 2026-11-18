import { A, h, doc } from '../areeba.js';
import readme from '../../components/Result/README.md?raw';

export default {
  title: 'Components/Status/Result',
  component: A.Result,
  parameters: doc(readme),
  args: { title: 'Top up successful', children: 'You added $100.00 to card •••• 1395.' },
};

export const Playground = {};
export const Failed = { args: { tone: 'danger', title: 'Payment declined', children: 'Top up your card or use another card, then try again.' } };
