// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=31-21
// source=components/bundle.js
// component=icons.eyeOff
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.eyeOff aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-eye-off',
  metadata: { nestable: true, props: { name: 'eyeOff' } },
}
