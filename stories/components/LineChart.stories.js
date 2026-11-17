import { A, doc } from '../areeba.js';
import readme from '../../components/LineChart/README.md?raw';

export default {
  title: 'Components/Charts/LineChart',
  component: A.LineChart,
  parameters: doc(readme),
  args: {
    title: 'Payment volume', height: 240,
    series: [{ key: 'card', label: 'Card' }, { key: 'qr', label: 'QR' }, { key: 'link', label: 'Pay link' }],
    data: [{ label: 'Jun', card: 42000, qr: 12000, link: 6000 }, { label: 'Jul', card: 46000, qr: 15000, link: 7500 }, { label: 'Aug', card: 44000, qr: 19000, link: 9000 }, { label: 'Sep', card: 51000, qr: 23000, link: 9500 }, { label: 'Oct', card: 56000, qr: 27500, link: 12000 }, { label: 'Nov', card: 61000, qr: 33000, link: 14500 }],
    format: (v) => '$' + (v >= 1000 ? v / 1000 + 'k' : v),
  },
  argTypes: {
    title: { control: 'text' },
    series: { control: 'object', description: '1–4 series; colours chart-1 → chart-4 in this order. chart-1 is the main subject.' },
    data: { control: 'object', description: 'Rows with a `label` (x) plus one number per series key.' },
    height: { control: { type: 'range', min: 160, max: 400, step: 8 } },
    format: { control: false, description: 'Formats axis ticks and tooltip values.' },
    ariaLabel: { control: 'text' },
  },
};

export const Playground = {};
export const SingleSeries = { args: { title: 'Card volume', series: [{ key: 'card', label: 'Card' }] } };
