// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=31-97
// source=components/bundle.js
// component=icons.forward
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.forward aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-forward',
  metadata: { nestable: true, props: { name: 'forward' } },
}
