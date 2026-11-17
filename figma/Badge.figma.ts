// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=13-28
// source=components/bundle.js
// component=Badge
import figma from 'figma'
const instance = figma.selectedInstance
const label = instance.getString('Label')
const tone = instance.getEnum('Tone', { Neutral: 'neutral', Brand: 'brand', Success: 'success', Warning: 'warning', Danger: 'danger', Info: 'info' })
const dot = instance.getBoolean('Dot')

export default {
  example: figma.code`<Badge${tone !== 'neutral' ? ` tone="${tone}"` : ''}${dot ? ' dot' : ''}>${label}</Badge>`,
  imports: ['const { Badge } = window.Areeba'],
  id: 'badge',
  metadata: { nestable: true },
}
