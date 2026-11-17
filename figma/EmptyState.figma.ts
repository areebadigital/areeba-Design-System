// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=13-98
// source=components/bundle.js
// component=EmptyState
import figma from 'figma'
const instance = figma.selectedInstance
const title = instance.getString('Title')
const body = instance.getString('Body')
let action
if (instance.getBoolean('Show action')) {
  const btn = instance.findConnectedInstance('button')
  if (btn && btn.type === 'INSTANCE') action = btn.executeTemplate().example
}

export default {
  example: figma.code`<EmptyState title="${title}"${action ? figma.code` action={${action}}` : ''}>
  ${body}
</EmptyState>`,
  imports: ['const { EmptyState } = window.Areeba'],
  id: 'emptystate',
  metadata: { nestable: true },
}
