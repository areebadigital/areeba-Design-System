import TopUp from '../../blocks/mobile/TopUp.jsx';
import source from '../../blocks/mobile/TopUp.jsx?raw';
import { phone, blockParams } from './frame.jsx';

export default {
  title: 'Blocks/Mobile/Top up',
  component: TopUp,
  decorators: [phone],
  parameters: blockParams(source, 'A complete flow in one component: choose how, pick the card, enter the amount on the number pad (with fee and limits), confirm the summary, done. Click through it in the first story; the others open at each step. From the areeba pay app.'),
};
export const Flow = { name: '1. Choose how' };
export const PickCard = { name: '2. Pick the card', args: { initialStep: 'card' } };
export const Amount = { name: '3. Amount', args: { initialStep: 'amount', initialAmount: '100' } };
export const TooHigh = { name: '3. Amount over the limit', args: { initialStep: 'amount', initialAmount: '3000' } };
export const Confirm = { name: '4. Confirm', args: { initialStep: 'confirm', initialAmount: '100' } };
export const Done = { name: '5. Done', args: { initialStep: 'done', initialAmount: '100' } };
