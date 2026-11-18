// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=31-166
// source=components/bundle.js
// component=icons.logout
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.logout aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-logout',
  metadata: { nestable: true, props: { name: 'logout' } },
}
