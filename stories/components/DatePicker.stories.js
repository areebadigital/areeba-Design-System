import { A, h, doc } from '../areeba.js';
import readme from '../../components/DatePicker/README.md?raw';

/* Storybook's date control passes timestamps; the component takes Date objects. */
const toDates = (a) => { const o = { ...a }; ['value', 'defaultValue', 'today', 'min', 'max'].forEach((k) => { if (typeof o[k] === 'number') o[k] = new Date(o[k]); }); return o; };

export default {
  title: 'Components/Inputs/DatePicker',
  component: A.DatePicker,
  parameters: doc(readme),
  args: { label: 'Settlement date', defaultValue: new Date(2026, 10, 20), today: new Date(2026, 10, 17), min: new Date(2026, 10, 3), placeholder: 'Select date', hint: '', error: '' },
  argTypes: {
    label: { control: 'text' },
    defaultValue: { control: 'date', description: 'Uncontrolled starting date.' },
    value: { control: 'date', description: 'Controlled date.' },
    today: { control: 'date', description: 'Ringed in the calendar. Defaults to now.' },
    min: { control: 'date', description: 'Earlier dates are disabled.' },
    max: { control: 'date', description: 'Later dates are disabled.' },
    placeholder: { control: 'text' }, hint: { control: 'text' }, error: { control: 'text' },
    defaultOpen: { control: 'boolean' },
    onChange: { action: 'changed', description: '`(date)`' },
  },
  render: (args) => h(A.DatePicker, toDates(args)),
  decorators: [(Story) => h('div', { style: { minHeight: 440 } }, Story())],
};

export const Playground = {};
export const Open = { args: { defaultOpen: true } };
export const CalendarOnly = { name: 'Calendar (inline)', render: () => h(A.Calendar, { value: new Date(2026, 10, 20), today: new Date(2026, 10, 17) }) };
