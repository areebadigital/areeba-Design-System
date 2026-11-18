// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=36-410
// source=components/bundle.js
// component=Result
import figma from 'figma'
const instance = figma.selectedInstance
const danger = instance.getEnum('Tone', { Success: false, Danger: true })
const title = instance.findText('title').textContent
const body = instance.findText('body').textContent
const action = instance.getBoolean('Show action') ? instance.findConnectedInstances(() => true).map((n) => n.executeTemplate().example)[0] : undefined

export default {
  example: action
    ? figma.code`<Result${danger ? ' tone="danger"' : ''} title="${title}" action={${action}}>${body}</Result>`
    : figma.code`<Result${danger ? ' tone="danger"' : ''} title="${title}">${body}</Result>`,
  imports: ['const { Result, Button } = window.Areeba'],
  id: 'result',
  metadata: { nestable: true },
}
