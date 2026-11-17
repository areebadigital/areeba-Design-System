// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=14-33
// source=components/bundle.js
// component=List
import figma from 'figma'
const instance = figma.selectedInstance
// Code string of a nested connected instance (used where a parent lists several children)
function codeOf(node) {
  const ex = node.executeTemplate().example[0]
  return ex && ex.type === 'CODE' ? ex.code.trim() : ''
}
const toValue = (s) => s.split(' · ')[0].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')

const rows = instance.findConnectedInstances((n) => n.codeConnectId() === 'listitem').map(codeOf).filter(Boolean)

export default {
  example: figma.code`<List>
  ${rows.join('\n  ')}
</List>`,
  imports: ['const { List, ListItem, Badge } = window.Areeba'],
  id: 'list',
  metadata: { nestable: true },
}
