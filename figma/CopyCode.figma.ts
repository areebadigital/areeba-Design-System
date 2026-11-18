// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=35-459
// source=components/bundle.js
// component=CopyCode
import figma from 'figma'
const instance = figma.selectedInstance
const label = instance.getString('Label')
const code = instance.getString('Code')

export default {
  example: figma.code`<CopyCode label="${label}" code="${code}" />`,
  imports: ['const { CopyCode } = window.Areeba'],
  id: 'copy-code',
  metadata: { nestable: true },
}
