import { A, h, doc } from '../areeba.js';
import readme from '../../components/Sidebar/README.md?raw';

export default {
  title: 'Components/Navigation/Sidebar',
  component: A.Sidebar,
  parameters: { ...doc(readme), layout: 'fullscreen' },
  args: { value: 'tx', footer: 'Green Grocer · Main branch', items: [{ value: 'home', label: 'Overview', icon: 'home' }, { value: 'tx', label: 'Transactions', icon: 'list', count: '1,284' }, { value: 'cards', label: 'Cards', icon: 'card' }, { value: 'payouts', label: 'Payouts', icon: 'send' }, { value: 'stores', label: 'Stores', icon: 'store' }, { value: 'reports', label: 'Reports', icon: 'chart' }, { value: 'settings', label: 'Settings', icon: 'settings' }] },
  argTypes: {
    items: { control: 'object', description: '`{ value, label, icon, href?, count? }[]`. icon: home · list · card · send · store · chart · settings · user.' },
    value: { control: 'text', description: 'Current page (aria-current="page").' },
    brand: { control: 'text', description: 'Top slot. Defaults to the name "areeba".' },
    footer: { control: 'text' },
    onChange: { action: 'changed', description: '`(value)`; when set, links do not navigate.' },
  },
  render: (args) => h('div', { style: { display: 'flex', height: 480 } }, h(A.Sidebar, args), h('div', { style: { flex: 1, background: 'var(--surface-sunken)' } })),
};

export const Playground = {};
