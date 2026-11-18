// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=31-113
// source=components/bundle.js
// component=icons.download
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.download aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-download',
  metadata: { nestable: true, props: { name: 'download' } },
}
