// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=34-432
// source=components/bundle.js
// component=MiniCard
import figma from 'figma'
const instance = figma.selectedInstance
const variant = instance.getEnum('Variant', { Night: 'night', Brand: 'brand' })

export default {
  example: figma.code`<MiniCard${variant !== 'night' ? ` variant="${variant}"` : ''} />`,
  imports: ['const { MiniCard } = window.Areeba'],
  id: 'mini-card',
  metadata: { nestable: true },
}
