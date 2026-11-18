import SignIn from '../../blocks/mobile/SignIn.jsx';
import source from '../../blocks/mobile/SignIn.jsx?raw';
import { phone, blockParams } from './frame.jsx';

export default {
  title: 'Blocks/Mobile/Sign in',
  component: SignIn,
  decorators: [phone],
  parameters: blockParams(source, 'Sign in with phone number and password, forgotten password and sign up. The phone field is left-to-right with the +961 prefix. From the areeba pay app.'),
};
export const Default = { name: 'Sign in' };
export const WrongPassword = { name: 'Wrong password', args: { error: true } };
