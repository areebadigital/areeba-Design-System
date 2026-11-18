import Profile from '../../blocks/mobile/Profile.jsx';
import source from '../../blocks/mobile/Profile.jsx?raw';
import { phone, blockParams } from './frame.jsx';

export default {
  title: 'Blocks/Mobile/Profile',
  component: Profile,
  decorators: [phone],
  parameters: blockParams(source, 'Who you are, then settings grouped by topic: areeba ID, account, notifications (switches), security, help, and sign out last. From the areeba pay app.'),
};
export const Default = { name: 'Profile' };
