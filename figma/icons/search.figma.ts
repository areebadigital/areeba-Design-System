// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=31-105
// source=components/bundle.js
// component=icons.search
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.search aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-search',
  metadata: { nestable: true, props: { name: 'search' } },
}
