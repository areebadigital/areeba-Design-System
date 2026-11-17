// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=16-113
// source=components/bundle.js
// component=Sidebar
import figma from 'figma'
const instance = figma.selectedInstance
const footer = instance.getString('Footer')
const items = instance.findConnectedInstances((n) => n.codeConnectId() === 'sidebar-item').map((n) => n.executeTemplate().metadata.props)
const current = items.find((t) => t.active)

export default {
  example: figma.code`<Sidebar
  items={[
    ${items.map((t) => t.item).join(',\n    ')},
  ]}${current ? `
  value="${current.value}"` : ''}
  footer="${footer}"
  onChange={(value) => {}}
/>`,
  imports: ['const { Sidebar } = window.Areeba'],
  id: 'sidebar',
  metadata: { nestable: true },
}
