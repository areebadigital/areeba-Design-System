// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=31-141
// source=components/bundle.js
// component=icons.backspace
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.backspace aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-backspace',
  metadata: { nestable: true, props: { name: 'backspace' } },
}
