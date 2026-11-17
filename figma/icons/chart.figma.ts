// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=4-72
// source=components/bundle.js
// component=icons.chart
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.chart aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-chart',
  metadata: { nestable: true, props: { name: 'chart' } },
}
