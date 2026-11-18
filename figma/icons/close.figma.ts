// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=31-81
// source=components/bundle.js
// component=icons.close
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.close aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-close',
  metadata: { nestable: true, props: { name: 'close' } },
}
