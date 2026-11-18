// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=8-17
// source=components/bundle.js
// component=icons.chevronRight
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.chevronRight aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-chevron-right',
  metadata: { nestable: true, props: { name: 'chevronRight' } },
}
