import VerifyCode from '../../blocks/mobile/VerifyCode.jsx';
import source from '../../blocks/mobile/VerifyCode.jsx?raw';
import { phone, blockParams } from './frame.jsx';

export default {
  title: 'Blocks/Mobile/Verify code',
  component: VerifyCode,
  decorators: [phone],
  parameters: blockParams(source, 'The SMS one-time code before a transfer or on a new device. One real input drawn as boxes, so paste and SMS autofill work. From the areeba pay app (transfers with OTP).'),
};
export const Default = { name: 'Verify code', args: { defaultValue: '4821' } };
export const Wrong = { name: 'Wrong code', args: { defaultValue: '482193', error: true } };
