// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=13-94
// source=components/bundle.js
// component=Toast
import figma from 'figma'
const instance = figma.selectedInstance
const tone = instance.getEnum('Tone', { Neutral: 'neutral', Success: 'success', Danger: 'danger' })
const message = instance.getString('Message')
const action = instance.getBoolean('Show action') ? instance.getString('Action') : ''

export default {
  example: figma.code`<Toast${tone !== 'neutral' ? ` tone="${tone}"` : ''}${action ? ` action="${action}" onAction={() => {}}` : ''}>${message}</Toast>`,
  imports: ['const { Toast } = window.Areeba'],
  id: 'toast',
  metadata: { nestable: true },
}
