// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=31-208
// source=components/bundle.js
// component=icons.transfer
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.transfer aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-transfer',
  metadata: { nestable: true, props: { name: 'transfer' } },
}
