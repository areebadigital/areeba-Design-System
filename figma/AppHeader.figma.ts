// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=36-236
// source=components/bundle.js
// component=AppHeader
import figma from 'figma'
const instance = figma.selectedInstance
const modal = instance.getEnum('Variant', { Default: false, Modal: true })
const title = instance.getString('Title')
const sub = instance.getBoolean('Show subtitle') ? ` subtitle="${instance.getString('Subtitle')}"` : ''
const start = instance.getBoolean('Show start') ? (modal ? ' start={<IconButton icon="close" label="Close" onClick={close} />}' : ' start={<IconButton icon="back" label="Back" onClick={goBack} />}') : ''
const end = instance.getBoolean('Show end') ? (modal ? ' end={<IconButton icon="help" label="Help" />}' : ' end={<ActionMenu label="More" items={items} />}') : ''

export default {
  example: figma.code`<AppHeader${modal ? ' variant="modal"' : ''} title="${title}"${sub}${start}${end} />`,
  imports: ['const { AppHeader, IconButton, ActionMenu } = window.Areeba'],
  id: 'app-header',
  metadata: { nestable: true },
}
