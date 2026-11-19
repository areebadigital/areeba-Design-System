import { A, h, doc } from '../areeba.js';
import readme from '../../components/ListItem/README.md?raw';

export default {
  title: 'Components/Data display/ListItem',
  component: A.ListItem,
  subcomponents: { List: A.List },
  parameters: doc(readme),
  args: { leading: 'G', title: 'Green Grocer', subtitle: 'Today, 14:32 · Visa •• 4021', amount: '−$42.00' },
  argTypes: {
    title: { control: 'text' }, subtitle: { control: 'text' },
    leading: { control: 'text', description: 'Initials or an icon in a 40px circle.' },
    amount: { control: 'text', description: 'Formatted amount. A leading "+" renders it in success green; debits use the minus sign (U+2212).' },
    trailing: { control: false, description: 'Extra trailing content, e.g. a Badge.' },
  },
  render: (args) => h(A.List, null, h(A.ListItem, args)),
};

export const Playground = {};
export const Transactions = { render: () => h(A.List, null,
  h(A.ListItem, { leading: 'G', title: 'Green Grocer', subtitle: 'Today, 14:32 · Visa •• 4021', amount: '−$42.00' }),
  h(A.ListItem, { leading: 'SA', title: 'Sara Ali', subtitle: 'Yesterday · Transfer in', amount: '+$1,250.00' }),
  h(A.ListItem, { leading: 'S', title: 'StreamBox', subtitle: '12 Nov · Subscription', amount: '−$15.99', trailing: h(A.Badge, { tone: 'warning' }, 'Pending') })) };
