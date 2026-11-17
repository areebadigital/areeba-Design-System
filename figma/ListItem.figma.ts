// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=14-32
// source=components/bundle.js
// component=ListItem
import figma from 'figma'
const instance = figma.selectedInstance
const leading = instance.getBoolean('Show leading') ? instance.getString('Initials') : ''
const title = instance.getString('Title')
const subtitle = instance.getString('Subtitle')
const amount = instance.getString('Amount')
let badge
if (instance.getBoolean('Show badge')) {
  const b = instance.findConnectedInstance('badge')
  if (b && b.type === 'INSTANCE') badge = b.executeTemplate().example
}

export default {
  example: figma.code`<ListItem${leading ? ` leading="${leading}"` : ''} title="${title}" subtitle="${subtitle}" amount="${amount}"${badge ? figma.code` trailing={${badge}}` : ''} />`,
  imports: ['const { ListItem } = window.Areeba'],
  id: 'listitem',
  metadata: { nestable: true },
}
