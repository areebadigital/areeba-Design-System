import { A, h, doc } from '../areeba.js';
import readme from '../../components/TabBar/README.md?raw';

export default {
  title: 'Components/Navigation/TabBar',
  component: A.TabBar,
  parameters: { ...doc(readme), layout: 'centered' },
  args: { value: 'home', label: 'Main', items: [{ value: 'home', label: 'Home', icon: 'home' }, { value: 'cards', label: 'Cards', icon: 'card' }, { value: 'pay', label: 'Pay', icon: 'send' }, { value: 'insights', label: 'Insights', icon: 'chart' }, { value: 'me', label: 'Profile', icon: 'user' }] },
  argTypes: {
    items: { control: 'object', description: '3–5 destinations. icon: home · card · send · chart · user.' },
    value: { control: 'inline-radio', options: ['home', 'cards', 'pay', 'insights', 'me'], description: 'Current destination (aria-current="page").' },
    label: { control: 'text' },
    onChange: { action: 'changed', description: '`(value)`' },
  },
  decorators: [(Story) => h('div', { style: { width: 390 } }, Story())],
};

export const Playground = {};
