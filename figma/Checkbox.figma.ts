// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=11-145
// source=components/bundle.js
// component=Checkbox
import figma from 'figma'
const instance = figma.selectedInstance
const label = instance.getString('Label')
const hint = instance.getBoolean('Show hint') ? instance.getString('Hint') : ''
const checked = instance.getEnum('Checked', { False: '', True: ' defaultChecked', Mixed: ' indeterminate' })
const disabled = instance.getEnum('State', { Default: '', Disabled: ' disabled' })

export default {
  example: figma.code`<Checkbox label="${label}"${hint ? ` hint="${hint}"` : ''}${checked}${disabled} onChange={(checked) => {}} />`,
  imports: ['const { Checkbox } = window.Areeba'],
  id: 'checkbox',
  metadata: { nestable: true },
}
