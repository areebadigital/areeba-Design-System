// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=34-332
// source=components/bundle.js
// component=SearchField
import figma from 'figma'
const instance = figma.selectedInstance
const state = instance.getEnum('State', { Empty: 'empty', Filled: 'filled', Focus: 'focus' })
const value = instance.getString('Value')

export default {
  example: state === 'empty'
    ? figma.code`<SearchField label="${value}" placeholder="${value}" onChange={setQuery} />`
    : figma.code`<SearchField label="Search transactions" value="${value}" onChange={setQuery} />`,
  imports: ['const { SearchField } = window.Areeba'],
  id: 'search-field',
  metadata: { nestable: true },
}
