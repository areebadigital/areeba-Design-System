// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=31-150
// source=components/bundle.js
// component=icons.phone
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.phone aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-phone',
  metadata: { nestable: true, props: { name: 'phone' } },
}
