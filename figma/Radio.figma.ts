// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=43-502
// source=components/bundle.js
// component=RadioGroup
import figma from 'figma'
const instance = figma.selectedInstance
const label = instance.getString('Label')
const hint = instance.getBoolean('Show hint') ? `, hint: '${instance.getString('Hint')}'` : ''
const state = instance.getEnum('State', { Default: 'default', Selected: 'selected', Disabled: 'disabled' })
const value = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const option = `{ value: '${value}', label: '${label}'${hint}${state === 'disabled' ? ', disabled: true' : ''} }`

export default {
  example: figma.code`${option}`,
  imports: ['const { RadioGroup } = window.Areeba'],
  id: 'radio',
  metadata: { nestable: true, props: { option, selected: state === 'selected' ? value : undefined, card: instance.getEnum('Style', { Plain: false, Card: true }) } },
}
