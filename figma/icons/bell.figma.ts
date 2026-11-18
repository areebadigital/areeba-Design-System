// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=31-5
// source=components/bundle.js
// component=icons.bell
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.bell aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-bell',
  metadata: { nestable: true, props: { name: 'bell' } },
}
