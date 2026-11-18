import SendMoney from '../../blocks/mobile/SendMoney.jsx';
import source from '../../blocks/mobile/SendMoney.jsx?raw';
import { phone, blockParams } from './frame.jsx';

export default {
  title: 'Blocks/Mobile/Send money',
  component: SendMoney,
  decorators: [phone],
  parameters: blockParams(source, 'The full transfer flow: who (search, recent, contacts), how much and why (fee and daily limit), confirm (with the 3-day acceptance rule), done. Click through the first story. From the areeba pay app.'),
};
export const Who = { name: '1. Who' };
export const Amount = { name: '2. Amount and note', args: { initialStep: 'amount' } };
export const OverLimit = { name: '2. Over the daily limit', args: { initialStep: 'amount', initialAmount: '2500' } };
export const Confirm = { name: '3. Confirm', args: { initialStep: 'confirm' } };
export const Done = { name: '4. Done', args: { initialStep: 'done' } };
