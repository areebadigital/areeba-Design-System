// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=4-78
// source=components/bundle.js
// component=icons.user
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.user aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-user',
  metadata: { nestable: true, props: { name: 'user' } },
}
