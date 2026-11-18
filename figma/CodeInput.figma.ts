// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=34-509
// source=components/bundle.js
// component=CodeInput
import figma from 'figma'
const instance = figma.selectedInstance
const invalid = instance.getEnum('State', { Typing: false, Invalid: true })
const hint = instance.getString('Hint')

export default {
  example: figma.code`<CodeInput label="Verification code" length={6} ${invalid ? 'error="That code is not right. Check it and try again."' : `hint="${hint}"`} onComplete={verify} />`,
  imports: ['const { CodeInput } = window.Areeba'],
  id: 'code-input',
  metadata: { nestable: true },
}
