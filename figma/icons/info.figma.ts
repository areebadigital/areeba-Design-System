// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=4-109
// source=components/bundle.js
// component=icons.info
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.info aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-info',
  metadata: { nestable: true, props: { name: 'info' } },
}
