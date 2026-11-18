// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=31-56
// source=components/bundle.js
// component=icons.lock
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.lock aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-lock',
  metadata: { nestable: true, props: { name: 'lock' } },
}
