import Transactions from '../../blocks/saas/Transactions.jsx';
import source from '../../blocks/saas/Transactions.jsx?raw';
import { desktop, blockParams } from './frame.jsx';

export default {
  title: 'Blocks/SaaS/Transactions',
  component: Transactions,
  decorators: [desktop],
  parameters: { ...blockParams(source, 'The merchant portal’s transactions page: period and store filters, export, four key numbers with change against last month (a word and an arrow, never colour alone), daily volume, and the table with search and status filters (try them).'), layout: 'fullscreen' },
};
export const Default = { name: 'Transactions' };
