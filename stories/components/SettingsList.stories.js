import { A, h, doc } from '../areeba.js';
import readme from '../../components/SettingsList/README.md?raw';

export default {
  title: 'Components/Data display/SettingsList',
  component: A.SettingsList,
  subcomponents: { SettingsRow: A.SettingsRow },
  parameters: doc(readme),
  args: { title: 'Account settings' },
  render: (args) => h('div', { style: { maxWidth: 380 } }, h(A.SettingsList, args, h(A.SettingsRow, { icon: 'card', label: 'My areeba cards', onClick: () => {} }), h(A.SettingsRow, { icon: 'user', label: 'My beneficiaries', badge: 'New', onClick: () => {} }), h(A.SettingsRow, { icon: 'chart', label: 'Spending limit', value: '$2,500 a day', onClick: () => {} }))),
};

export const Playground = {};
export const Switches = { name: 'With switches', render: () => h('div', { style: { maxWidth: 380 } }, h(A.SettingsList, { title: 'Notifications' }, h(A.SettingsRow, { icon: 'mail', label: 'Email notifications', toggle: { defaultChecked: true } }), h(A.SettingsRow, { icon: 'phone', label: 'SMS notifications', toggle: {} }), h(A.SettingsRow, { icon: 'transfer', label: 'Transactions', description: 'Every payment and transfer', toggle: { defaultChecked: true } }))) };
export const Danger = { name: 'Danger and info rows', render: () => h('div', { style: { maxWidth: 380 } }, h(A.SettingsList, { title: 'More' }, h(A.SettingsRow, { icon: 'info', label: 'About areeba pay', value: 'v1.203.1' }), h(A.SettingsRow, { icon: 'logout', label: 'Sign out', tone: 'danger', onClick: () => {} }))) };
