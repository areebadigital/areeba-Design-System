// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=8-7
// source=components/bundle.js
// component=icons.chevronDown
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.chevronDown aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-chevron-down',
  metadata: { nestable: true, props: { name: 'chevronDown' } },
}
