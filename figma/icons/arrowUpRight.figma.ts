// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=31-39
// source=components/bundle.js
// component=icons.arrowUpRight
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.arrowUpRight aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-arrow-up-right',
  metadata: { nestable: true, props: { name: 'arrowUpRight' } },
}
