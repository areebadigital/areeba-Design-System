// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=14-202
// source=components/bundle.js
// component=PaymentCard
import figma from 'figma'
const instance = figma.selectedInstance
const number = instance.getString('Last 4')
const last4 = number.replace(/\D/g, '').slice(-4)
const holder = instance.getString('Holder')
const expiry = instance.getString('Expiry')
const network = instance.getString('Network')
const variant = instance.getEnum('Variant', { Night: 'night', Brand: 'brand' })
const frozen = instance.getEnum('Frozen', { False: false, True: true })

export default {
  example: figma.code`<PaymentCard last4="${last4}" holder="${holder}" expiry="${expiry}" network="${network}"${variant !== 'night' ? ` variant="${variant}"` : ''}${frozen ? ' frozen' : ''} />`,
  imports: ['const { PaymentCard } = window.Areeba'],
  id: 'paymentcard',
  metadata: { nestable: true },
}
