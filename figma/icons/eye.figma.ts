// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=31-13
// source=components/bundle.js
// component=icons.eye
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.eye aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-eye',
  metadata: { nestable: true, props: { name: 'eye' } },
}
