// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=11-165
// source=components/bundle.js
// component=Switch
import figma from 'figma'
const instance = figma.selectedInstance
const label = instance.getString('Label')
const checked = instance.getEnum('Checked', { Off: '', On: ' defaultChecked' })
const disabled = instance.getEnum('State', { Default: '', Disabled: ' disabled' })

export default {
  example: figma.code`<Switch label="${label}"${checked}${disabled} onChange={(checked) => {}} />`,
  imports: ['const { Switch } = window.Areeba'],
  id: 'switch',
  metadata: { nestable: true },
}
