// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=31-122
// source=components/bundle.js
// component=icons.share
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<icons.share aria-hidden="true" />`,
  imports: ['const { icons } = window.Areeba'],
  id: 'icon-share',
  metadata: { nestable: true, props: { name: 'share' } },
}
