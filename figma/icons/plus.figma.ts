// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=31-31
// source=components/bundle.js
// component=icons.plus
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.plus aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-plus',
  metadata: { nestable: true, props: { name: 'plus' } },
}
