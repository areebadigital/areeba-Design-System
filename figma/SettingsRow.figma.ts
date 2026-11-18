// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=35-269
// source=components/bundle.js
// component=SettingsRow
import figma from 'figma'
const instance = figma.selectedInstance
function iconName(prop) {
  const icon = instance.getInstanceSwap(prop)
  if (!icon || icon.type !== 'INSTANCE') return undefined
  const r = icon.executeTemplate()
  return r.metadata && r.metadata.props ? r.metadata.props.name : undefined
}

const type = instance.getEnum('Type', { Link: 'link', Value: 'value', Toggle: 'toggle', Danger: 'danger', Disabled: 'disabled' })
const label = instance.findText('label').textContent
const icon = iconName('Icon')
const desc = instance.getBoolean('Show description') ? ` description="${instance.getString('Description')}"` : ''
const value = type === 'value' ? ` value="${instance.findText('value').textContent}"` : ''
const rest = type === 'toggle' ? ' toggle={{ checked, onChange: setChecked }}' : type === 'danger' ? ' tone="danger" onClick={signOut}' : type === 'disabled' ? ' disabled onClick={() => {}}' : ' href="#"'

export default {
  example: figma.code`<SettingsRow${icon ? ` icon="${icon}"` : ''} label="${label}"${desc}${value}${rest} />`,
  imports: ['const { SettingsRow } = window.Areeba'],
  id: 'settings-row',
  metadata: { nestable: true },
}
