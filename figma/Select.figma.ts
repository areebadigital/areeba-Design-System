// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=11-97
// source=components/bundle.js
// component=Select
import figma from 'figma'
const instance = figma.selectedInstance
// Code string of a nested connected instance (used where a parent lists several children)
function codeOf(node) {
  const ex = node.executeTemplate().example[0]
  return ex && ex.type === 'CODE' ? ex.code.trim() : ''
}
const toValue = (s) => s.split(' · ')[0].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')

const label = instance.getString('Label')
const value = instance.getString('Value')
const state = instance.getEnum('State', { Closed: 'closed', Placeholder: 'placeholder', Open: 'open', Error: 'error' })
const hintText = instance.findText('hint')
const hint = hintText && hintText.type === 'TEXT' ? hintText.textContent : ''
const options = instance.findConnectedInstances((n) => n.codeConnectId() === 'select-option').map((n) => n.executeTemplate().metadata.props.option)
const optionsCode = options.length ? `[\n    ${options.join(',\n    ')},\n  ]` : 'options'
const empty = state === 'placeholder' || state === 'error'

export default {
  example: figma.code`<Select
  label="${label}"
  options={${optionsCode}}
  ${empty ? `placeholder="${value}"` : `defaultValue="${toValue(value)}"`}${hint ? `
  ${state === 'error' ? 'error' : 'hint'}="${hint}"` : ''}${state === 'open' ? `
  defaultOpen` : ''}
  onChange={(value) => {}}
/>`,
  imports: ['const { Select } = window.Areeba'],
  id: 'select',
  metadata: { nestable: true },
}
