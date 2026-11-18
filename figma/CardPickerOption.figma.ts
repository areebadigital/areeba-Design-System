// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=34-448
// source=components/bundle.js
// component=CardPicker
import figma from 'figma'
const instance = figma.selectedInstance
const num = instance.getString('Number').replace(/\D/g, '')
const balance = instance.getString('Balance')
const state = instance.getEnum('State', { Default: 'default', Selected: 'selected', Disabled: 'disabled' })
const card = `{ value: '${num}', last4: '${num}', balance: '${balance}'${state === 'disabled' ? ', disabled: true' : ''} }`

export default {
  example: figma.code`${card}`,
  imports: ['const { CardPicker } = window.Areeba'],
  id: 'card-picker-option',
  metadata: { nestable: true, props: { card, selected: state === 'selected' ? num : undefined } },
}
