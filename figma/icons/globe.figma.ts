// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=31-198
// source=components/bundle.js
// component=icons.globe
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.globe aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-globe',
  metadata: { nestable: true, props: { name: 'globe' } },
}
