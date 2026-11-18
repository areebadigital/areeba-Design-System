import Payouts from '../../blocks/saas/Payouts.jsx';
import source from '../../blocks/saas/Payouts.jsx?raw';
import { desktop, blockParams } from './frame.jsx';

export default {
  title: 'Blocks/SaaS/Payouts',
  component: Payouts,
  decorators: [desktop],
  parameters: { ...blockParams(source, 'Payouts: the payout history with pages (try them), the next payout and where it goes (the IBAN stays left-to-right), and the payout schedule. “Change” opens a dialog with a Select; saving shows a toast.'), layout: 'fullscreen' },
};
export const Default = { name: 'Payouts' };
