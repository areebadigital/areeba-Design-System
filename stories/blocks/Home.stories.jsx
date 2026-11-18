import Home from '../../blocks/mobile/Home.jsx';
import source from '../../blocks/mobile/Home.jsx?raw';
import { phone, blockParams } from './frame.jsx';

export default {
  title: 'Blocks/Mobile/Home',
  component: Home,
  decorators: [phone],
  parameters: blockParams(source, 'The home screen of a card app: balance with a hide toggle, the card, quick actions (More opens the card menu), today’s activity and the tab bar. From the areeba pay app.'),
};
export const Default = { name: 'Home' };
