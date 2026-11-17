// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=11-54
// source=components/bundle.js
// component=Select (option)
import figma from 'figma'
const instance = figma.selectedInstance
// Code string of a nested connected instance (used where a parent lists several children)
function codeOf(node) {
  const ex = node.executeTemplate().example[0]
  return ex && ex.type === 'CODE' ? ex.code.trim() : ''
}
const toValue = (s) => s.split(' · ')[0].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')

const label = instance.getString('Label')
const state = instance.getEnum('State', { Default: 'default', Active: 'active', Selected: 'selected', Disabled: 'disabled' })
const value = toValue(label)
const option = `{ value: '${value}', label: '${label}'${state === 'disabled' ? ', disabled: true' : ''} }`

export default {
  example: figma.code`${option}`,
  imports: ['const { Select } = window.Areeba'],
  id: 'select-option',
  metadata: { nestable: true, props: { option, value, selected: state === 'selected' ? 'true' : '' } },
}
