// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=11-387
// source=components/bundle.js
// component=DatePicker
import figma from 'figma'
const instance = figma.selectedInstance
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
// "20 Nov 2026" or "November 2026" -> month index and year
function parseMonth(s) {
  const parts = s.trim().split(/\s+/)
  const y = parts[parts.length - 1], m = MONTHS.indexOf(parts[parts.length - 2].slice(0, 3))
  return { y, m }
}

const label = instance.getString('Label')
const value = instance.getString('Value')
const open = instance.getEnum('State', { Closed: false, Open: true })
const { y, m } = parseMonth(value)
const day = value.trim().split(/\s+/)[0]

export default {
  example: figma.code`<DatePicker label="${label}" defaultValue={new Date(${y}, ${m}, ${day})}${open ? ' defaultOpen' : ''} onChange={(date) => {}} />`,
  imports: ['const { DatePicker } = window.Areeba'],
  id: 'datepicker',
  metadata: { nestable: true },
}
