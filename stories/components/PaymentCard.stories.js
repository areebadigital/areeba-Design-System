import { A, h, doc, row } from '../areeba.js';
import readme from '../../components/PaymentCard/README.md?raw';

export default {
  title: 'Components/Data display/PaymentCard',
  component: A.PaymentCard,
  parameters: doc(readme),
  args: { last4: '4021', holder: 'Karim Hassan', expiry: '09/29', network: 'VISA', variant: 'night', frozen: false },
  argTypes: {
    last4: { control: 'text' }, holder: { control: 'text' }, expiry: { control: 'text' }, network: { control: 'text' },
    variant: { control: 'inline-radio', options: ['night', 'brand'], description: 'night: Obsidian face. brand: Crimson Deep (Chalk in dark).', table: { defaultValue: { summary: 'night' } } },
    frozen: { control: 'boolean', description: 'Shows a "Frozen" tag and adds it to the accessible name.' },
  },
};

export const Playground = {};
export const Variants = { render: () => row(h(A.PaymentCard, { last4: '4021', holder: 'Karim Hassan', expiry: '09/29', network: 'VISA' }), h(A.PaymentCard, { variant: 'brand', last4: '7710', holder: 'Karim Hassan', expiry: '03/28', network: 'MC', frozen: true })) };
