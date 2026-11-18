import { A, h, doc, row } from '../areeba.js';
import readme from '../../components/Avatar/README.md?raw';

export default {
  title: 'Components/Data display/Avatar',
  component: A.Avatar,
  parameters: doc(readme),
  args: { initials: 'RK', size: 'md' },
};

export const Playground = {};
export const Sizes = { render: () => row(h(A.Avatar, { initials: 'RK', size: 'sm' }), h(A.Avatar, { initials: 'RK' }), h(A.Avatar, { initials: 'LH', status: true }), h(A.Avatar, { initials: 'RK', size: 'lg' })) };
