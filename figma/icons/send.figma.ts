// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=4-64
// source=components/bundle.js
// component=icons.send
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.send aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-send',
  metadata: { nestable: true, props: { name: 'send' } },
}
