// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=32-187
// source=components/bundle.js
// component=ActionBar
import figma from 'figma'
const instance = figma.selectedInstance
const stacked = instance.getEnum('Layout', { Single: false, Stacked: true })
const buttons = instance.findConnectedInstances(() => true).map((n) => n.executeTemplate().example)

export default {
  example: figma.code`<ActionBar${stacked ? ' stacked' : ''}>
  ${buttons}
</ActionBar>`,
  imports: ['const { ActionBar, Button } = window.Areeba'],
  id: 'action-bar',
  metadata: { nestable: true },
}
