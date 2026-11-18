import { A, h, doc } from '../areeba.js';
import readme from '../../components/PageDots/README.md?raw';

export default {
  title: 'Components/Data display/PageDots',
  component: A.PageDots,
  parameters: doc(readme),
  args: { count: 3, current: 0 },
};

export const Playground = {};

