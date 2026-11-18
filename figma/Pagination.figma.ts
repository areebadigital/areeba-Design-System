// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=40-678
// source=components/bundle.js
// component=Pagination
import figma from 'figma'
const instance = figma.selectedInstance
const range = instance.getBoolean('Show range')

export default {
  example: range
    ? figma.code`<Pagination page={page} total={1284} pageSize={25} onChange={setPage} />`
    : figma.code`<Pagination page={page} pageCount={52} onChange={setPage} />`,
  imports: ['const { Pagination } = window.Areeba'],
  id: 'pagination',
  metadata: { nestable: true },
}
