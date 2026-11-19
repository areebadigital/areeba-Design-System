import { A, h, doc } from '../areeba.js';
import readme from '../../components/TextArea/README.md?raw';

export default {
  title: 'Components/Inputs/TextArea',
  component: A.TextArea,
  parameters: doc(readme),
  args: { label: 'Note to recipient', hint: 'They see this with the transfer.', maxLength: 140, defaultValue: 'Dinner on Friday' },
  argTypes: { label: { control: 'text' }, hint: { control: 'text' }, error: { control: 'text' }, maxLength: { control: 'number' }, rows: { control: 'number' }, placeholder: { control: 'text' } },
  render: (args) => h('div', { style: { maxWidth: 420 } }, h(A.TextArea, args)),
};

export const Playground = {};
export const WithError = { name: 'With error', args: { label: 'Reason for the refund', hint: undefined, maxLength: 280, defaultValue: '', error: 'Tell the customer why you are refunding, in a sentence or two.' } };
