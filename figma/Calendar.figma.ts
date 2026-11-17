// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=11-179
// source=components/bundle.js
// component=Calendar
import figma from 'figma'
const instance = figma.selectedInstance
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
// "20 Nov 2026" or "November 2026" -> month index and year
function parseMonth(s) {
  const parts = s.trim().split(/\s+/)
  const y = parts[parts.length - 1], m = MONTHS.indexOf(parts[parts.length - 2].slice(0, 3))
  return { y, m }
}

const title = instance.findText('title')
const { y, m } = parseMonth(title && title.type === 'TEXT' ? title.textContent : 'November 2026')
let selected = '', today = '', min = ''
for (const d of instance.findConnectedInstances((n) => n.codeConnectId() === 'calendar-day')) {
  const p = d.executeTemplate().metadata.props
  if (p.state === 'selected') selected = p.day
  if (p.state === 'today') today = p.day
  if (p.state !== 'disabled' && p.state !== 'empty' && !min) min = p.day
}
const date = (d) => `new Date(${y}, ${m}, ${d})`

export default {
  example: figma.code`<Calendar${selected ? ` value={${date(selected)}}` : ''}${today ? ` today={${date(today)}}` : ''}${min && min !== '1' ? ` min={${date(min)}}` : ''} onChange={(date) => {}} />`,
  imports: ['const { Calendar } = window.Areeba'],
  id: 'calendar',
  metadata: { nestable: true },
}
