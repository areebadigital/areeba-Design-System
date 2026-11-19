import AddBeneficiary from '../../blocks/mobile/AddBeneficiary.jsx';
import source from '../../blocks/mobile/AddBeneficiary.jsx?raw';
import { phone, blockParams } from './frame.jsx';

export default {
  title: 'Blocks/Mobile/Add beneficiary',
  component: AddBeneficiary,
  decorators: [phone],
  parameters: blockParams(source, 'Save someone you send money to: a bank account (IBAN, always left-to-right) or an areeba wallet (phone number), chosen with card radios; hints before people type, an optional note with a counter, and errors that say what to fix, summed up at the top.'),
};
export const Bank = { name: 'Bank account' };
export const Wallet = { name: 'areeba wallet', args: { initialType: 'wallet' } };
export const Errors = { name: 'With errors', args: { errors: true } };
