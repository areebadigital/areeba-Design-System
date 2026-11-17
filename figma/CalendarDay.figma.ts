// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=11-178
// source=components/bundle.js
// component=Calendar (day cell)
import figma from 'figma'
const instance = figma.selectedInstance
const day = instance.getString('Day')
const state = instance.getEnum('State', { Default: 'default', Today: 'today', Selected: 'selected', Disabled: 'disabled', Empty: 'empty' })

export default {
  example: figma.code`// Day cell, drawn by <Calendar>: ${state === 'empty' ? 'empty' : `${day} (${state})`}`,
  imports: ['const { Calendar } = window.Areeba'],
  id: 'calendar-day',
  metadata: { nestable: true, props: { day, state } },
}
