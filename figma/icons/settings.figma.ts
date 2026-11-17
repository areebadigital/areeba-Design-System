// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=4-102
// source=components/bundle.js
// component=icons.settings
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.settings aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-settings',
  metadata: { nestable: true, props: { name: 'settings' } },
}
