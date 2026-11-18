import SignIn from '../../blocks/saas/SignIn.jsx';
import source from '../../blocks/saas/SignIn.jsx?raw';
import { desktop, blockParams } from './frame.jsx';

export default {
  title: 'Blocks/SaaS/Sign in',
  component: SignIn,
  decorators: [desktop],
  parameters: { ...blockParams(source, 'The portal sign-in page: the Night brand panel with the one Signal Red highlight the system allows (a large headline), beside the form. The panel hides below 960px.'), layout: 'fullscreen' },
};
export const Default = { name: 'Sign in' };
export const WrongPassword = { name: 'Wrong password', args: { error: true } };
