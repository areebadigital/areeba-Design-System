import { A, h, doc, row } from '../areeba.js';
import readme from '../../components/TextField/README.md?raw';

export default {
  title: 'Components/Inputs/TextField',
  component: A.TextField,
  parameters: doc(readme),
  args: { label: 'Amount', prefix: '$', placeholder: '0.00', inputMode: 'decimal', hint: 'Available: $12,480.50', error: '', disabled: false },
  argTypes: {
    label: { control: 'text', description: 'Always visible. Placeholders are examples, never labels.' },
    hint: { control: 'text', description: 'Helper text below the field, linked with aria-describedby.' },
    error: { control: 'text', description: 'Replaces the hint, turns the border danger and sets aria-invalid. Say what is wrong and how to fix it.' },
    prefix: { control: 'text', description: 'Leading text such as a currency symbol.' },
    placeholder: { control: 'text' },
    inputMode: { control: 'select', options: ['text', 'decimal', 'numeric', 'email', 'tel'], description: 'Use decimal for amounts so mobile shows the number pad.' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed', description: 'Native input change event (text entry is the one place a real <input> is used).' },
  },
};

export const Playground = {};
export const States = { render: () => row(
  h(A.TextField, { label: 'Amount', prefix: '$', placeholder: '0.00', inputMode: 'decimal', hint: 'Available: $12,480.50' }),
  h(A.TextField, { label: 'IBAN', defaultValue: 'LB62 0999', error: 'IBAN is too short. Check the number and try again.' }),
  h(A.TextField, { label: 'Reference', defaultValue: 'txn_7Hq2LmA9', disabled: true })) };
