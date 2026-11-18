// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=35-189
// source=components/bundle.js
// component=DetailList
import figma from 'figma'
const instance = figma.selectedInstance
const items = instance.findConnectedInstances(() => true).map((n) => n.executeTemplate().metadata.props.item).filter(Boolean)

export default {
  example: figma.code`<DetailList items={[
  ${items.join(',\n  ')},
]} />`,
  imports: ['const { DetailList } = window.Areeba'],
  id: 'detail-list',
  metadata: { nestable: true },
}
