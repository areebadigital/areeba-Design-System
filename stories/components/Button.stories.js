import { A, h, doc, row } from '../areeba.js';
import readme from '../../components/Button/README.md?raw';

export default {
  title: 'Components/Actions/Button',
  component: A.Button,
  parameters: doc(readme),
  args: { children: 'Send money', variant: 'primary', size: 'md', block: false, disabled: false },
  argTypes: {
    children: { control: 'text', description: 'Label: verb first, sentence case, names the outcome.' },
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost', 'danger'], description: 'primary: the one main action per screen (Crimson). secondary: alternatives (Crimson tint). ghost: low emphasis. danger: destructive confirmations.', table: { defaultValue: { summary: 'primary' } } },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'], description: 'sm 32px (dense SaaS tables) · md 44px (default, Figma) · lg 48px (mobile primary actions)', table: { defaultValue: { summary: 'md' } } },
    block: { control: 'boolean', description: 'Full width. Use for the mobile primary action.' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked', description: 'Provided by the consumer.' },
  },
};

export const Playground = {};
export const Variants = { render: () => row(h(A.Button, { variant: 'primary' }, 'Send money'), h(A.Button, { variant: 'secondary' }, 'Request'), h(A.Button, { variant: 'ghost' }, 'Cancel'), h(A.Button, { variant: 'danger' }, 'Freeze card'), h(A.Button, { disabled: true }, 'Disabled')) };
export const Sizes = { render: () => row(h(A.Button, { size: 'sm', variant: 'secondary' }, 'Export CSV'), h(A.Button, null, 'Continue'), h(A.Button, { size: 'lg' }, 'Pay $42.00')) };
export const MobileBlock = { name: 'Mobile primary (block)', args: { block: true, size: 'lg', children: 'Pay $42.00' }, parameters: { viewport: { defaultViewport: 'mobile1' } } };
