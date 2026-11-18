// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=35-435
// source=components/bundle.js
// component=StatCard
import figma from 'figma'
const instance = figma.selectedInstance
const label = instance.getString('Label')
const value = instance.getString('Value')
const change = instance.getString('Change').replace(/^[▲▼]\s*/, '')
const period = instance.getString('Period')
const trend = instance.getEnum('Trend', { Good: ', good: true', Bad: ', good: false', Neutral: '' })
const direction = trend ? 'up' : 'flat'

export default {
  example: figma.code`<StatCard label="${label}" value="${value}" change={{ direction: '${direction}', value: '${change}', label: '${period}'${trend} }} />`,
  imports: ['const { StatCard } = window.Areeba'],
  id: 'stat-card',
  metadata: { nestable: true },
}
