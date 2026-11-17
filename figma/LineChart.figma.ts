// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=15-143
// source=components/bundle.js
// component=LineChart
import figma from 'figma'
const instance = figma.selectedInstance
const title = instance.getString('Title')
const series = instance.getEnum('Series', {
  '1': "[{ key: 'card', label: 'Card' }]",
  '3': "[\n    { key: 'card', label: 'Card' },\n    { key: 'qr', label: 'QR' },\n    { key: 'link', label: 'Pay link' },\n  ]",
})

export default {
  example: figma.code`<LineChart
  title="${title}"
  series={${series}}
  data={data} // [{ label: 'Jun', card: 42000, qr: 12000, link: 6000 }, ...]
  format={(v) => '$' + v.toLocaleString('en-US')}
/>`,
  imports: ['const { LineChart } = window.Areeba'],
  id: 'linechart',
  metadata: { nestable: true },
}
