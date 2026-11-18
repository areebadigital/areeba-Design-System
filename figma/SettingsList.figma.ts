// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=35-286
// source=components/bundle.js
// component=SettingsList
import figma from 'figma'
const instance = figma.selectedInstance
const title = instance.findText('title').textContent
const rows = instance.findConnectedInstances(() => true).map((n) => n.executeTemplate().example)

export default {
  example: figma.code`<SettingsList title="${title}">
  ${rows}
</SettingsList>`,
  imports: ['const { SettingsList, SettingsRow } = window.Areeba'],
  id: 'settings-list',
  metadata: { nestable: true },
}
