// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=4-58
// source=components/bundle.js
// component=icons.card
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.card aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-card',
  metadata: { nestable: true, props: { name: 'card' } },
}
