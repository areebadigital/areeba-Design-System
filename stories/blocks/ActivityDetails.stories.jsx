import ActivityDetails from '../../blocks/mobile/ActivityDetails.jsx';
import source from '../../blocks/mobile/ActivityDetails.jsx?raw';
import { phone, blockParams } from './frame.jsx';

export default {
  title: 'Blocks/Mobile/Activity details',
  component: ActivityDetails,
  decorators: [phone],
  parameters: blockParams(source, 'One transaction as a sheet: the amount, who and when, the facts as label/value rows, then Share and Report a problem. From the areeba pay app.'),
};
export const Pending = {};
export const Declined = { args: { status: 'declined' } };
