import { A, doc } from '../areeba.js';
import readme from '../../components/BarChart/README.md?raw';

export default {
  title: 'Components/Charts/BarChart',
  component: A.BarChart,
  parameters: doc(readme),
  args: {
    title: 'Transactions by weekday', height: 240,
    series: [{ key: 'thisWeek', label: 'This week' }, { key: 'lastWeek', label: 'Last week' }],
    data: [{ label: 'Mon', thisWeek: 820, lastWeek: 760 }, { label: 'Tue', thisWeek: 910, lastWeek: 880 }, { label: 'Wed', thisWeek: 870, lastWeek: 900 }, { label: 'Thu', thisWeek: 1040, lastWeek: 950 }, { label: 'Fri', thisWeek: 1260, lastWeek: 1180 }, { label: 'Sat', thisWeek: 1420, lastWeek: 1310 }, { label: 'Sun', thisWeek: 690, lastWeek: 720 }],
  },
  argTypes: {
    title: { control: 'text' },
    series: { control: 'object', description: '1–4 series; the current period is chart-1.' },
    data: { control: 'object' },
    height: { control: { type: 'range', min: 160, max: 400, step: 8 } },
    format: { control: false },
    ariaLabel: { control: 'text' },
  },
};

export const Playground = {};
export const SingleSeries = { args: { title: 'Payouts by store', series: [{ key: 'v', label: 'Payouts' }], data: [{ label: 'Downtown', v: 18400 }, { label: 'Harbour', v: 22100 }, { label: 'Hillside', v: 9800 }, { label: 'Old town', v: 6400 }] } };
