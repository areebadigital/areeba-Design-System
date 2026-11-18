// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=31-175
// source=components/bundle.js
// component=icons.faceId
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.faceId aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-face-id',
  metadata: { nestable: true, props: { name: 'faceId' } },
}
