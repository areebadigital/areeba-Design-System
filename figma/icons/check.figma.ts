// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=4-115
// source=components/bundle.js
// component=icons.check
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.check aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-check',
  metadata: { nestable: true, props: { name: 'check' } },
}
