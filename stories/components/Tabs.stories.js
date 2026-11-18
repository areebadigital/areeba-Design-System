import { A, h, doc } from '../areeba.js';
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
export const WithPanels = {
  name: 'With panels',
  render: function Panels() {
    const [v, setV] = window.React.useState('business');
    const items = [{ value: 'business', label: 'Business' }, { value: 'team', label: 'Team' }, { value: 'alerts', label: 'Notifications' }];
    const body = { business: 'Business name, address and settlement account.', team: 'People who can sign in to this portal.', alerts: 'Emails and texts about payments and payouts.' };
    return h('div', { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
      h(A.Tabs, { id: 'settings', label: 'Settings', items, value: v, onChange: setV }),
      h(A.TabPanel, { tabs: 'settings', value: v }, h('p', { style: { margin: 0 } }, body[v])));
  },
};
