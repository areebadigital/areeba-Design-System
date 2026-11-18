// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=31-89
// source=components/bundle.js
// component=icons.back
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.back aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-back',
  metadata: { nestable: true, props: { name: 'back' } },
}
