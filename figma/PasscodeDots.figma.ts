// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=34-546
// source=components/bundle.js
// component=PasscodeDots
import figma from 'figma'
const instance = figma.selectedInstance
const state = instance.getEnum('State', { Empty: 0, Partial: 3, Full: 6, Error: -1 })

export default {
  example: state < 0
    ? figma.code`<PasscodeDots length={6} filled={6} error="Wrong passcode. 2 tries left." />`
    : figma.code`<PasscodeDots length={6} filled={${state}} />`,
  imports: ['const { PasscodeDots } = window.Areeba'],
  id: 'passcode-dots',
  metadata: { nestable: true },
}
