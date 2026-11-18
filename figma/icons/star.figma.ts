// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=31-74
// source=components/bundle.js
// component=icons.star
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.star aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-star',
  metadata: { nestable: true, props: { name: 'star' } },
}
