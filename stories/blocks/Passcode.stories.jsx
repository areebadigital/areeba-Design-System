import Passcode from '../../blocks/mobile/Passcode.jsx';
import source from '../../blocks/mobile/Passcode.jsx?raw';
import { phone, blockParams } from './frame.jsx';

export default {
  title: 'Blocks/Mobile/Passcode',
  component: Passcode,
  decorators: [phone],
  parameters: blockParams(source, 'Unlock with a 6-digit passcode on the number pad, or Face ID. Wrong tries say how many are left; too many lock the app with a reset link. From the areeba pay app.'),
};
export const Enter = { name: 'Enter passcode', args: { initialDigits: '1234' } };
export const Wrong = { name: 'Wrong passcode', args: { initialDigits: '123456', state: 'wrong' } };
export const Locked = { name: 'Locked', args: { state: 'locked' } };
