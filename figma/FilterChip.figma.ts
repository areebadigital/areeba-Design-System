// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=34-348
// source=components/bundle.js
// component=FilterChip
import figma from 'figma'
const instance = figma.selectedInstance
const label = instance.getString('Label')
const selected = instance.getEnum('Selected', { False: false, True: true })
const menu = instance.getEnum('Menu', { False: false, True: true })

export default {
  example: figma.code`<FilterChip label="${label}"${selected ? ' selected' : ''}${menu ? ' hasPopup="dialog"' : ''} onClick={() => {}} />`,
  imports: ['const { FilterChip } = window.Areeba'],
  id: 'filter-chip',
  metadata: { nestable: true },
}
