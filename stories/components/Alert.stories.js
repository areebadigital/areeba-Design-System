import { A, h, doc, stack } from '../areeba.js';
import readme from '../../components/Alert/README.md?raw';

export default {
  title: 'Components/Status/Alert',
  component: A.Alert,
  parameters: doc(readme),
  args: { tone: 'danger', title: 'Payment declined', children: 'Insufficient balance. Top up your account or use another card.' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['info', 'success', 'warning', 'danger'], description: 'danger is announced immediately (role="alert"); the others politely (role="status").', table: { defaultValue: { summary: 'info' } } },
    title: { control: 'text', description: 'What happened.' },
    children: { control: 'text', description: 'What to do next.' },
  },
};

export const Playground = {};
export const Tones = { render: () => stack(
  h(A.Alert, { tone: 'success', title: 'Transfer sent' }, '$250.00 to Rami Khoury will arrive within minutes.'),
  h(A.Alert, { tone: 'info', title: 'Settlement at 18:00' }, 'Payments after 18:00 settle the next business day.'),
  h(A.Alert, { tone: 'warning', title: 'Card expires soon' }, 'Your Visa ending 4021 expires on 30 Nov. A replacement is on its way.'),
  h(A.Alert, { tone: 'danger', title: 'Payment declined' }, 'Insufficient balance. Top up your account or use another card.')) };
