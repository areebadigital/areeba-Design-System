// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=16-14
// source=components/bundle.js
// component=Tabs (item)
import figma from 'figma'
const instance = figma.selectedInstance
// Code string of a nested connected instance (used where a parent lists several children)
function codeOf(node) {
  const ex = node.executeTemplate().example[0]
  return ex && ex.type === 'CODE' ? ex.code.trim() : ''
}
const toValue = (s) => s.split(' · ')[0].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')

const label = instance.getString('Label')
const selected = instance.getEnum('State', { Default: '', Selected: 'true' })
const item = `{ value: '${toValue(label)}', label: '${label}' }`

export default {
  example: figma.code`${item}`,
  imports: ['const { Tabs } = window.Areeba'],
  id: 'tabs-tab',
  metadata: { nestable: true, props: { item, value: toValue(label), selected } },
}
