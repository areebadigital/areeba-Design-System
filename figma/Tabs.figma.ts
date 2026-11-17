// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=16-15
// source=components/bundle.js
// component=Tabs
import figma from 'figma'
const instance = figma.selectedInstance
const tabs = instance.findConnectedInstances((n) => n.codeConnectId() === 'tabs-tab').map((n) => n.executeTemplate().metadata.props)
const current = tabs.find((t) => t.selected)

export default {
  example: figma.code`<Tabs
  label="Period"
  items={[
    ${tabs.map((t) => t.item).join(',\n    ')},
  ]}${current ? `
  defaultValue="${current.value}"` : ''}
  onChange={(value) => {}}
/>`,
  imports: ['const { Tabs } = window.Areeba'],
  id: 'tabs',
  metadata: { nestable: true },
}
