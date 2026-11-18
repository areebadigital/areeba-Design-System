// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=35-188
// source=components/bundle.js
// component=DetailList
import figma from 'figma'
const instance = figma.selectedInstance
const label = instance.getString('Label')
const value = instance.getString('Value')
const emphasis = instance.getEnum('Emphasis', { False: false, True: true })
const ltr = /[$€£]|\d{4}|•/.test(value)
const item = `{ label: '${label}', value: '${value}'${ltr ? ', ltr: true' : ''}${emphasis ? ', emphasis: true' : ''} }`

export default {
  example: figma.code`${item}`,
  imports: ['const { DetailList } = window.Areeba'],
  id: 'detail-list-row',
  metadata: { nestable: true, props: { item } },
}
