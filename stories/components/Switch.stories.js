import { A, h, doc, stack } from '../areeba.js';
import readme from '../../components/Switch/README.md?raw';

export default {
  title: 'Components/Inputs/Switch',
  component: A.Switch,
  parameters: doc(readme),
  args: { label: 'Freeze card', defaultChecked: true, disabled: false },
  argTypes: {
    label: { control: 'text', description: 'Names the setting, not the state.' },
    checked: { control: 'boolean', description: 'Controlled state.' },
    defaultChecked: { control: 'boolean', description: 'Uncontrolled starting state.' },
    disabled: { control: 'boolean' },
    name: { control: 'text', description: 'Submits `value` (default "on") while on, through a hidden input.' },
    onChange: { action: 'changed', description: '`(checked)`: the new state, not a DOM event.' },
  },
};

export const Playground = {};
export const States = { render: () => stack(h(A.Switch, { label: 'Freeze card', defaultChecked: true }), h(A.Switch, { label: 'Online payments' }), h(A.Switch, { label: 'Contactless (set by your bank)', disabled: true })) };
