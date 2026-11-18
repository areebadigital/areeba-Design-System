// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=32-51
// source=components/bundle.js
// component=QuickAction
import figma from 'figma'
const instance = figma.selectedInstance
function iconName(prop) {
  const icon = instance.getInstanceSwap(prop)
  if (!icon || icon.type !== 'INSTANCE') return undefined
  const r = icon.executeTemplate()
  return r.metadata && r.metadata.props ? r.metadata.props.name : undefined
}

const label = instance.getString('Label')
const disabled = instance.getEnum('State', { Default: false, Disabled: true })
const icon = iconName('Icon') || 'plus'

export default {
  example: figma.code`<QuickAction icon="${icon}" label="${label}"${disabled ? ' disabled' : ''} />`,
  imports: ['const { QuickAction } = window.Areeba'],
  id: 'quick-action',
  metadata: { nestable: true },
}
