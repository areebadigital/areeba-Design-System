// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=16-39
// source=components/bundle.js
// component=TabBar
import figma from 'figma'
const instance = figma.selectedInstance
const items = instance.findConnectedInstances((n) => n.codeConnectId() === 'tabbar-item').map((n) => n.executeTemplate().metadata.props)
const current = items.find((t) => t.active)

export default {
  example: figma.code`<TabBar
  items={[
    ${items.map((t) => t.item).join(',\n    ')},
  ]}${current ? `
  value="${current.value}"` : ''}
  onChange={(value) => {}}
/>`,
  imports: ['const { TabBar } = window.Areeba'],
  id: 'tabbar',
  metadata: { nestable: true },
}
