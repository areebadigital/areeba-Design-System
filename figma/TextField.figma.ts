// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=11-34
// source=components/bundle.js
// component=TextField
import figma from 'figma'
const instance = figma.selectedInstance
const label = instance.getString('Label')
const value = instance.getString('Value')
const state = instance.getEnum('State', { Default: 'default', Filled: 'filled', Focus: 'focus', Error: 'error' })
const hint = instance.getBoolean('Show hint') ? instance.getString('Hint') : ''
const prefix = instance.getBoolean('Show prefix') ? instance.getString('Prefix') : ''

export default {
  example: figma.code`<TextField
  label="${label}"${prefix ? `
  prefix="${prefix}"` : ''}
  ${state === 'default' ? `placeholder="${value}"` : `defaultValue="${value}"`}${hint ? `
  ${state === 'error' ? 'error' : 'hint'}="${hint}"` : ''}
/>`,
  imports: ['const { TextField } = window.Areeba'],
  id: 'textfield',
  metadata: { nestable: true },
}
