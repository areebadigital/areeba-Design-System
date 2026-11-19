// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=43-561
// source=components/bundle.js
// component=RadioGroup
import figma from 'figma'
const instance = figma.selectedInstance
const label = instance.getString('Label')
const hint = instance.getBoolean('Show hint') ? ` hint="${instance.getString('Hint')}"` : ''
const card = instance.getEnum('Style', { Plain: false, Card: true })
const opts = instance.findConnectedInstances(() => true).map((n) => n.executeTemplate().metadata.props).filter((p) => p && p.option)
const sel = opts.find((p) => p.selected)

export default {
  example: figma.code`<RadioGroup label="${label}"${hint}${card ? ' variant="card"' : ''} name="choice"${sel ? ` defaultValue="${sel.selected}"` : ''} options={[
  ${opts.map((p) => p.option).join(',\n  ')},
]} onChange={setValue} />`,
  imports: ['const { RadioGroup } = window.Areeba'],
  id: 'radio-group',
  metadata: { nestable: true },
}
