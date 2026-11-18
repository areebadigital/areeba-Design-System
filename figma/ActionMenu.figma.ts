// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=32-111
// source=components/bundle.js
// component=ActionMenu
import figma from 'figma'
const instance = figma.selectedInstance
const items = instance.findConnectedInstances(() => true).map((n) => n.executeTemplate().metadata.props.item).filter(Boolean)

export default {
  example: figma.code`<ActionMenu label="Card actions" items={[
  ${items.join(',\n  ')},
]} />`,
  imports: ['const { ActionMenu } = window.Areeba'],
  id: 'action-menu',
  metadata: { nestable: true },
}
