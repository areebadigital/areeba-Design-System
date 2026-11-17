// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=15-279
// source=components/bundle.js
// component=BarChart
import figma from 'figma'
const instance = figma.selectedInstance
const title = instance.getString('Title')
const series = instance.getEnum('Series', {
  '1': "[{ key: 'thisWeek', label: 'This week' }]",
  '2': "[\n    { key: 'thisWeek', label: 'This week' },\n    { key: 'lastWeek', label: 'Last week' },\n  ]",
})

export default {
  example: figma.code`<BarChart
  title="${title}"
  series={${series}}
  data={data} // [{ label: 'Mon', thisWeek: 820, lastWeek: 760 }, ...]
/>`,
  imports: ['const { BarChart } = window.Areeba'],
  id: 'barchart',
  metadata: { nestable: true },
}
