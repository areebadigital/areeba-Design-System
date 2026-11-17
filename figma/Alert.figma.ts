// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=13-67
// source=components/bundle.js
// component=Alert
import figma from 'figma'
const instance = figma.selectedInstance
const tone = instance.getEnum('Tone', { Info: 'info', Success: 'success', Warning: 'warning', Danger: 'danger' })
const title = instance.getBoolean('Show title') ? instance.getString('Title') : ''
const body = instance.getString('Body')

export default {
  example: figma.code`<Alert tone="${tone}"${title ? ` title="${title}"` : ''}>
  ${body}
</Alert>`,
  imports: ['const { Alert } = window.Areeba'],
  id: 'alert',
  metadata: { nestable: true },
}
