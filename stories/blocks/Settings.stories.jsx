import Settings from '../../blocks/saas/Settings.jsx';
import source from '../../blocks/saas/Settings.jsx?raw';
import { desktop, blockParams } from './frame.jsx';

export default {
  title: 'Blocks/SaaS/Settings',
  component: Settings,
  decorators: [desktop],
  parameters: { ...blockParams(source, 'Settings in tabs (arrow keys move between them): the business details form in two columns, the settlement account, the team with row menus and an invite dialog, and notification switches.'), layout: 'fullscreen' },
};
export const Business = {};
export const Team = { args: { tab: 'team' } };
export const Notifications = { args: { tab: 'alerts' } };
