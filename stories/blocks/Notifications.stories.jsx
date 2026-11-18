import Notifications from '../../blocks/mobile/Notifications.jsx';
import source from '../../blocks/mobile/Notifications.jsx?raw';
import { phone, blockParams } from './frame.jsx';

export default {
  title: 'Blocks/Mobile/Notifications',
  component: Notifications,
  decorators: [phone],
  parameters: blockParams(source, 'Money requests to accept or decline (try it), and how earlier ones ended: accepted, declined, expired. Status is always a word and an icon. From the areeba pay app.'),
};
export const Default = { name: 'Notifications' };
