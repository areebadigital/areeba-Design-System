// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=34-382
// source=components/bundle.js
// component=AmountInput
import figma from 'figma'
const instance = figma.selectedInstance
const label = instance.getString('Label')
const currency = instance.getString('Currency')
const hint = instance.getString('Hint')
const invalid = instance.getEnum('State', { Default: false, Invalid: true })

export default {
  example: figma.code`<AmountInput label="${label}" currency="${currency}" value={amount} onChange={setAmount} fee={0} ${invalid ? 'error="More than your daily limit of $5,000.00"' : `hint="${hint}"`} />`,
  imports: ['const { AmountInput } = window.Areeba'],
  id: 'amount-input',
  metadata: { nestable: true },
}
