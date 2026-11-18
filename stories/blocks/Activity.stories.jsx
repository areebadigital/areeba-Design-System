import Activity from '../../blocks/mobile/Activity.jsx';
import source from '../../blocks/mobile/Activity.jsx?raw';
import { phone, blockParams } from './frame.jsx';

export default {
  title: 'Blocks/Mobile/Activity',
  component: Activity,
  decorators: [phone],
  parameters: blockParams(source, 'All transactions: search, filter chips (period and card open pickers; Money in toggles), and days with their totals. Declined payments carry a badge, never red amounts. From the areeba pay app.'),
};
export const Default = { name: 'Activity' };
export const Empty = { name: 'No transactions', args: { empty: true } };
