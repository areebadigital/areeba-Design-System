import Overview from '../../blocks/saas/Overview.jsx';
import source from '../../blocks/saas/Overview.jsx?raw';
import { desktop, blockParams } from './frame.jsx';

export default {
  title: 'Blocks/SaaS/Overview',
  component: Overview,
  decorators: [desktop],
  parameters: { ...blockParams(source, 'The merchant portal’s home: what needs attention (an Alert), the month’s four key numbers, daily volume and sales by store, the latest transactions, the next payout, the monthly card limit and account set-up as meters. Two columns from 1024px, one below.'), layout: 'fullscreen' },
};
export const Default = { name: 'Overview' };
