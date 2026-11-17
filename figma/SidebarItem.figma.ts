// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=16-112
// source=components/bundle.js
// component=Sidebar (item)
import figma from 'figma'
const instance = figma.selectedInstance
// Code string of a nested connected instance (used where a parent lists several children)
function codeOf(node) {
  const ex = node.executeTemplate().example[0]
  return ex && ex.type === 'CODE' ? ex.code.trim() : ''
}
const toValue = (s) => s.split(' · ')[0].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')

const label = instance.getString('Label')
const swap = instance.getInstanceSwap('Icon')
const icon = swap && swap.type === 'INSTANCE' ? swap.executeTemplate().metadata.props.name : 'home'

const active = instance.getEnum('State', { Default: '', Hover: '', Active: 'true' })
const count = instance.getBoolean('Show count') ? instance.getString('Count') : ''
const item = `{ value: '${toValue(label)}', label: '${label}', icon: '${icon}'${count ? `, count: '${count}'` : ''} }`

export default {
  example: figma.code`${item}`,
  imports: ['const { Sidebar } = window.Areeba'],
  id: 'sidebar-item',
  metadata: { nestable: true, props: { item, value: toValue(label), active } },
}
