// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=32-35
// source=components/bundle.js
// component=IconButton
import figma from 'figma'
const instance = figma.selectedInstance
function iconName(prop) {
  const icon = instance.getInstanceSwap(prop)
  if (!icon || icon.type !== 'INSTANCE') return undefined
  const r = icon.executeTemplate()
  return r.metadata && r.metadata.props ? r.metadata.props.name : undefined
}

const plain = instance.getEnum('Variant', { Soft: false, Plain: true })
const badge = instance.getEnum('Badge', { False: false, True: true })
const icon = iconName('Icon') || 'bell'

export default {
  example: figma.code`<IconButton icon="${icon}" label="${icon}"${plain ? ' variant="plain"' : ''}${badge ? ' badge' : ''} />`,
  imports: ['const { IconButton } = window.Areeba'],
  id: 'icon-button',
  metadata: { nestable: true },
}
