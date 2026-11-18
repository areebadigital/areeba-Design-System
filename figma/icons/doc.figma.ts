// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=31-131
// source=components/bundle.js
// component=icons.doc
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.doc aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-doc',
  metadata: { nestable: true, props: { name: 'doc' } },
}
