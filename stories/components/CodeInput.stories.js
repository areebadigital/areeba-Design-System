import { A, h, doc } from '../areeba.js';
import readme from '../../components/CodeInput/README.md?raw';

export default {
  title: 'Components/Inputs/CodeInput',
  component: A.CodeInput,
  parameters: doc(readme),
  args: { label: 'Verification code', defaultValue: '4821', hint: 'The code expires in 2:00.' },
};

export const Playground = {};
export const WithError = { name: 'Wrong code', args: { defaultValue: '482193', error: 'That code is not right. Check the SMS and try again.' } };
