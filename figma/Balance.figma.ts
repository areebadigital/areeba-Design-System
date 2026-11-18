// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=35-178
// source=components/bundle.js
// component=Balance
import figma from 'figma'
const instance = figma.selectedInstance
const label = instance.getString('Label')
const amount = instance.getString('Amount')
const hidden = instance.getEnum('Visible', { True: false, False: true })

export default {
  example: figma.code`<Balance label="${label}" amount="${amount}"${hidden ? ' defaultHidden' : ''} />`,
  imports: ['const { Balance } = window.Areeba'],
  id: 'balance',
  metadata: { nestable: true },
}
