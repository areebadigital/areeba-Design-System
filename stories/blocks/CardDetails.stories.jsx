import CardDetails from '../../blocks/mobile/CardDetails.jsx';
import source from '../../blocks/mobile/CardDetails.jsx?raw';
import { phone, blockParams } from './frame.jsx';

export default {
  title: 'Blocks/Mobile/Card details',
  component: CardDetails,
  decorators: [phone],
  parameters: blockParams(source, 'One card: its actions (lock, PIN, details, favourite), card settings with the danger action last, and the card’s recent activity. From the areeba pay app.'),
};
export const Default = { name: 'Card details' };
