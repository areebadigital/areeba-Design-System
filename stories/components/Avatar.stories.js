import { A, h, doc, row } from '../areeba.js';
import readme from '../../components/Avatar/README.md?raw';

export default {
  title: 'Components/Data display/Avatar',
  component: A.Avatar,
  parameters: doc(readme),
  args: { initials: 'SA', size: 'md' },
};

export const Playground = {};
export const Sizes = { render: () => row(h(A.Avatar, { initials: 'SA', size: 'sm' }), h(A.Avatar, { initials: 'SA' }), h(A.Avatar, { initials: 'KH', status: true }), h(A.Avatar, { initials: 'SA', size: 'lg' })) };
