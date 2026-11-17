// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=4-96
// source=components/bundle.js
// component=icons.store
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.store aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-store',
  metadata: { nestable: true, props: { name: 'store' } },
}
