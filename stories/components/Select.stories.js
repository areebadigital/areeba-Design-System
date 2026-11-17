import { A, h, doc, row } from '../areeba.js';
import readme from '../../components/Select/README.md?raw';

const currencies = [{ value: 'usd', label: 'USD · US dollar' }, { value: 'lbp', label: 'LBP · Lebanese pound' }, { value: 'eur', label: 'EUR · Euro' }, { value: 'gbp', label: 'GBP · Pound sterling', disabled: true }];

export default {
  title: 'Components/Inputs/Select',
  component: A.Select,
  parameters: doc(readme),
  args: { label: 'Currency', options: currencies, defaultValue: 'usd', placeholder: 'Choose a currency', hint: '', error: '', disabled: false },
  argTypes: {
    label: { control: 'text' },
    options: { control: 'object', description: '`{ value, label, disabled? }[]`, 4–15 known values.' },
    value: { control: 'text', description: 'Controlled value.' },
    defaultValue: { control: 'text', description: 'Uncontrolled starting value.' },
    placeholder: { control: 'text', description: 'Shown in ink-muted until something is chosen.' },
    hint: { control: 'text' },
    error: { control: 'text' },
    name: { control: 'text', description: 'Submits the value in a form through a hidden input.' },
    disabled: { control: 'boolean' },
    defaultOpen: { control: 'boolean', description: 'Starts with the list open (demos and tests).' },
    onChange: { action: 'changed', description: '`(value, option)`: the chosen value, not a DOM event.' },
  },
  decorators: [(Story) => h('div', { style: { minHeight: 280 } }, Story())],
};

export const Playground = {};
export const Open = { args: { defaultOpen: true } };
export const Placeholder = { args: { defaultValue: undefined, label: 'Store', placeholder: 'Choose a store', hint: 'Payouts go to this store’s account', options: [{ value: '1', label: 'Hamra' }, { value: '2', label: 'Achrafieh' }] } };
export const WithError = { name: 'Error', args: { defaultValue: undefined, error: 'Choose a currency to continue.' } };
