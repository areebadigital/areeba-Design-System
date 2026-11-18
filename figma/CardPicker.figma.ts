// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=34-449
// source=components/bundle.js
// component=CardPicker
import figma from 'figma'
const instance = figma.selectedInstance
const opts = instance.findConnectedInstances(() => true).map((n) => n.executeTemplate().metadata.props).filter((p) => p && p.card)
const sel = opts.find((p) => p.selected)

export default {
  example: figma.code`<CardPicker label="Pay from" name="card"${sel ? ` defaultValue="${sel.selected}"` : ''} cards={[
  ${opts.map((p) => p.card).join(',\n  ')},
]} onChange={setCard} />`,
  imports: ['const { CardPicker } = window.Areeba'],
  id: 'card-picker',
  metadata: { nestable: true },
}
