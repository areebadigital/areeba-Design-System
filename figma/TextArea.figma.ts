// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=43-586
// source=components/bundle.js
// component=TextArea
import figma from 'figma'
const instance = figma.selectedInstance
const label = instance.getString('Label')
const state = instance.getEnum('State', { Default: 'default', Focus: 'default', Error: 'error' })
const counter = instance.getBoolean('Show counter') ? ' maxLength={140}' : ''

export default {
  example: state === 'error'
    ? figma.code`<TextArea label="${label}"${counter} error="Tell the customer why you are refunding." />`
    : figma.code`<TextArea label="${label}" hint="They see this with the transfer."${counter} />`,
  imports: ['const { TextArea } = window.Areeba'],
  id: 'text-area',
  metadata: { nestable: true },
}
