import { A, h, doc } from '../areeba.js';
import readme from '../../components/RadioGroup/README.md?raw';

const schedule = [{ value: 'daily', label: 'Every business day' }, { value: 'weekly', label: 'Every Monday' }, { value: 'monthly', label: 'On the 1st of the month' }];

export default {
  title: 'Components/Inputs/RadioGroup',
  component: A.RadioGroup,
  parameters: doc(readme),
  args: { label: 'Payout schedule', defaultValue: 'daily', options: schedule, hint: 'Payments before 18:00 are in that day’s payout.' },
  argTypes: {
    options: { control: 'object', description: '`{ value, label, hint, disabled }[]`' },
    variant: { control: 'inline-radio', options: ['default', 'card'] },
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    error: { control: 'text' }, hint: { control: 'text' }, disabled: { control: 'boolean' },
    onChange: { action: 'changed', description: '`(value, option)`' },
  },
  render: (args) => h('div', { style: { maxWidth: 420 } }, h(A.RadioGroup, args)),
};

export const Playground = {};
export const Cards = {
  args: { label: 'Transfer to', defaultValue: 'bank', variant: 'card', hint: undefined,
    options: [{ value: 'bank', label: 'Bank account', hint: '1–2 business days, by IBAN' }, { value: 'wallet', label: 'areeba wallet', hint: 'Instant, by phone number' }, { value: 'cash', label: 'Cash pickup', hint: 'Not available for this amount', disabled: true }] },
};
export const Horizontal = { args: { label: 'Account type', defaultValue: 'current', orientation: 'horizontal', hint: undefined, options: [{ value: 'current', label: 'Current' }, { value: 'savings', label: 'Savings' }] } };
export const WithError = { name: 'With error', args: { label: 'Document type', defaultValue: undefined, required: true, hint: undefined, error: 'Choose the type of document you are uploading.', options: [{ value: 'reg', label: 'Commercial register' }, { value: 'id', label: 'ID of the owner' }, { value: 'bank', label: 'Bank letter' }] } };
