// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=34-395
// source=components/bundle.js
// component=NumberPad
import figma from 'figma'
const instance = figma.selectedInstance
export default {
  example: figma.code`<NumberPad label="Amount keypad" onKey={(key) => setAmount((v) => padInput(v, key))} />`,
  imports: ['const { NumberPad, padInput } = window.Areeba'],
  id: 'number-pad',
  metadata: { nestable: true },
}
