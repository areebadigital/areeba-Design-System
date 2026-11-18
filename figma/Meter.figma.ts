// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=40-923
// source=components/bundle.js
// component=Meter
import figma from 'figma'
const instance = figma.selectedInstance
const tone = instance.getEnum('Tone', { Brand: 'brand', Warning: 'warning', Danger: 'danger', Success: 'success' })
const label = instance.findText('label').textContent
const value = instance.findText('value').textContent
const hint = instance.getBoolean('Show hint') ? ` hint="${instance.findText('hint').textContent}"` : ''

export default {
  example: figma.code`<Meter label="${label}" value={used} max={limit} valueText="${value}"${hint}${tone === 'success' ? ' tone="success"' : ''} />`,
  imports: ['const { Meter } = window.Areeba'],
  id: 'meter',
  metadata: { nestable: true },
}
