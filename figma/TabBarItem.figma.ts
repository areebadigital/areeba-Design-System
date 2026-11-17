// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=16-38
// source=components/bundle.js
// component=TabBar (item)
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

const active = instance.getEnum('State', { Inactive: '', Active: 'true' })
const item = `{ value: '${toValue(label)}', label: '${label}', icon: '${icon}' }`

export default {
  example: figma.code`${item}`,
  imports: ['const { TabBar } = window.Areeba'],
  id: 'tabbar-item',
  metadata: { nestable: true, props: { item, value: toValue(label), active } },
}
