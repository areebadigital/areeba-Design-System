// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=32-110
// source=components/bundle.js
// component=ActionMenu
import figma from 'figma'
const instance = figma.selectedInstance
function iconName(prop) {
  const icon = instance.getInstanceSwap(prop)
  if (!icon || icon.type !== 'INSTANCE') return undefined
  const r = icon.executeTemplate()
  return r.metadata && r.metadata.props ? r.metadata.props.name : undefined
}

const label = instance.getString('Label')
const state = instance.getEnum('State', { Default: '', Focus: '', Disabled: ', disabled: true', Danger: ', danger: true' })
const icon = iconName('Icon')

export default {
  example: figma.code`{ label: '${label}'${icon ? `, icon: '${icon}'` : ''}${state} }`,
  imports: ['const { ActionMenu } = window.Areeba'],
  id: 'action-menu-item',
  metadata: { nestable: true, props: { item: `{ label: '${label}'${icon ? `, icon: '${icon}'` : ''}${state} }` } },
}
