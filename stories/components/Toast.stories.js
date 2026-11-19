import { A, h, doc, stack } from '../areeba.js';
import readme from '../../components/Toast/README.md?raw';

export default {
  title: 'Components/Status/Toast',
  component: A.Toast,
  parameters: doc(readme),
  args: { tone: 'neutral', children: 'Card frozen', action: 'Undo' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['neutral', 'success', 'danger'], table: { defaultValue: { summary: 'neutral' } } },
    children: { control: 'text', description: 'Short confirmation of what just happened.' },
    action: { control: 'text', description: 'One optional action, usually "Undo".' },
    onAction: { action: 'action', description: 'Called when the action is pressed.' },
  },
};

export const Playground = {};
export const Tones = { render: () => stack(h(A.Toast, { tone: 'success' }, 'Transfer sent to Sara Ali'), h(A.Toast, { tone: 'neutral', action: 'Undo' }, 'Card frozen'), h(A.Toast, { tone: 'danger' }, 'Couldn’t export. Try again.')) };
