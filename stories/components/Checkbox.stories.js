import { A, h, doc, stack } from '../areeba.js';
import readme from '../../components/Checkbox/README.md?raw';

export default {
  title: 'Components/Inputs/Checkbox',
  component: A.Checkbox,
  parameters: doc(readme),
  args: { label: 'Email me a monthly statement', hint: 'Sent on the 1st of each month', defaultChecked: false, indeterminate: false, disabled: false },
  argTypes: {
    label: { control: 'text', description: 'Says what checking means. Clicking it toggles the box.' },
    hint: { control: 'text', description: 'Consequences, linked with aria-describedby.' },
    checked: { control: 'boolean', description: 'Controlled state.' },
    defaultChecked: { control: 'boolean', description: 'Uncontrolled starting state.' },
    indeterminate: { control: 'boolean', description: 'Partly selected children: shown as a dash, announced as "mixed".' },
    disabled: { control: 'boolean' },
    name: { control: 'text', description: 'Submits `value` (default "on") while checked, through a hidden input.' },
    onChange: { action: 'changed', description: '`(checked)`: the new state, not a DOM event.' },
  },
};

export const Playground = {};
export const States = { render: () => stack(
  h(A.Checkbox, { label: 'Select all transactions', indeterminate: true }),
  h(A.Checkbox, { label: 'Email me a monthly statement', hint: 'Sent on the 1st of each month', defaultChecked: true }),
  h(A.Checkbox, { label: 'Accept international payments' }),
  h(A.Checkbox, { label: 'Managed by your bank', defaultChecked: true, disabled: true })) };
