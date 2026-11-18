// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=35-376
// source=components/bundle.js
// component=PageDots
import figma from 'figma'
const instance = figma.selectedInstance
const current = instance.getEnum('Current', { '1': 0, '2': 1, '3': 2 })

export default {
  example: figma.code`<PageDots count={3} current={${current}} />`,
  imports: ['const { PageDots } = window.Areeba'],
  id: 'page-dots',
  metadata: { nestable: true },
}
