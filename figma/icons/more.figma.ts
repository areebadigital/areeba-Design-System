// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=31-47
// source=components/bundle.js
// component=icons.more
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.more aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-more',
  metadata: { nestable: true, props: { name: 'more' } },
}
