import { A, doc } from '../areeba.js';
import readme from '../../components/Tabs/README.md?raw';

export default {
  title: 'Components/Navigation/Tabs',
  component: A.Tabs,
  parameters: doc(readme),
  args: { label: 'Period', defaultValue: 'w', items: [{ value: 'd', label: 'Day' }, { value: 'w', label: 'Week' }, { value: 'm', label: 'Month' }, { value: 'y', label: 'Year' }] },
  argTypes: {
    items: { control: 'object', description: '`{ value, label }[]`, 2–5 views of the same data.' },
    value: { control: 'text', description: 'Controlled selected value.' },
    defaultValue: { control: 'text' },
    label: { control: 'text', description: 'Accessible name of the tab list.' },
    onChange: { action: 'changed', description: '`(value)`' },
  },
};

export const Playground = {};
