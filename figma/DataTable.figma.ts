// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=14-142
// source=components/bundle.js
// component=DataTable
import figma from 'figma'
const instance = figma.selectedInstance
const caption = instance.getBoolean('Show caption') ? instance.getString('Caption') : ''
const empty = instance.getEnum('State', { Default: false, Empty: true })
const emptyText = instance.findText('empty-text')

export default {
  example: figma.code`<DataTable${caption ? `
  caption="${caption}"` : ''}
  columns={[
    { key: 'id', label: 'Reference', mono: true },
    { key: 'date', label: 'Date' },
    { key: 'customer', label: 'Customer' },
    { key: 'status', label: 'Status', render: (r) => <Badge tone={r.tone} dot>{r.status}</Badge> },
    { key: 'amount', label: 'Amount', align: 'right', numeric: true },
  ]}
  rows={${empty ? '[]' : 'rows'}}${emptyText && emptyText.type === 'TEXT' ? `
  empty="${emptyText.textContent}"` : ''}
/>`,
  imports: ['const { DataTable, Badge } = window.Areeba'],
  id: 'datatable',
  metadata: { nestable: true },
}
