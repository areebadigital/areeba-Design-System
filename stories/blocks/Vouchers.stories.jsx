import Vouchers from '../../blocks/mobile/Vouchers.jsx';
import source from '../../blocks/mobile/Vouchers.jsx?raw';
import { phone, blockParams } from './frame.jsx';

export default {
  title: 'Blocks/Mobile/eStore vouchers',
  component: Vouchers,
  decorators: [phone],
  parameters: blockParams(source, 'Buy a recharge voucher: browse services, pick a price (USD and LBP, taxes included), confirm with your card, copy the code. From the areeba pay eStore.'),
};
export const Store = { name: '1. eStore' };
export const List = { name: '2. Vouchers', args: { initialStep: 'list' } };
export const Confirm = { name: '3. Confirm', args: { initialStep: 'confirm' } };
export const Done = { name: '4. Your code', args: { initialStep: 'done' } };
