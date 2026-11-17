import React from 'react';
import { A, h, doc } from '../areeba.js';
import readme from '../../components/Dialog/README.md?raw';

export default {
  title: 'Components/Overlays/Dialog',
  component: A.Dialog,
  parameters: { ...doc(readme), layout: 'fullscreen', docs: { ...doc(readme).docs, story: { inline: false, iframeHeight: 360 } } },
  args: { open: true, tone: 'danger', title: 'Freeze this card?', sheet: false },
  argTypes: {
    open: { control: 'boolean' },
    title: { control: 'text' },
    tone: { control: 'inline-radio', options: ['default', 'danger'], description: 'danger uses role="alertdialog".' },
    sheet: { control: 'boolean', description: 'Bottom sheet on mobile.' },
    actions: { control: false, description: 'Buttons, the confirming one last.' },
    onClose: { action: 'closed', description: 'Escape, backdrop click.' },
  },
  render: (args) => h('div', { style: { minHeight: 360 } }, h(A.Dialog, { ...args, actions: [h(A.Button, { key: 'c', variant: 'ghost' }, 'Cancel'), h(A.Button, { key: 'f', variant: args.tone === 'danger' ? 'danger' : 'primary' }, 'Freeze card')] }, h('p', null, 'Payments with Visa ending 4021 will be declined until you unfreeze it. You can do this anytime.'))),
};

export const Playground = {};
export const BottomSheet = { args: { sheet: true, tone: 'default' }, parameters: { viewport: { defaultViewport: 'mobile1' } } };
export const Interactive = {
  render: () => {
    function Demo() {
      const [open, setOpen] = React.useState(false);
      return h('div', { style: { minHeight: 360, padding: 24 } }, h(A.Button, { onClick: () => setOpen(true) }, 'Freeze card'),
        h(A.Dialog, { open, onClose: () => setOpen(false), tone: 'danger', title: 'Freeze this card?', actions: [h(A.Button, { key: 'c', variant: 'ghost', onClick: () => setOpen(false) }, 'Cancel'), h(A.Button, { key: 'f', variant: 'danger', onClick: () => setOpen(false) }, 'Freeze card')] }, h('p', null, 'Payments will be declined until you unfreeze it.')));
    }
    return h(Demo);
  },
};
