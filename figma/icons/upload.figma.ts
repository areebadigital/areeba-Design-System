// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=43-5
// source=components/bundle.js
// component=icons.upload
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.upload aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-upload',
  metadata: { nestable: true, props: { name: 'upload' } },
}
