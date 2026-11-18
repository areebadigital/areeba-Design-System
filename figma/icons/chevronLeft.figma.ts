// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=8-12
// source=components/bundle.js
// component=icons.chevronLeft
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.chevronLeft aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-chevron-left',
  metadata: { nestable: true, props: { name: 'chevronLeft' } },
}
