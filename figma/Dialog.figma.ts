// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=17-82
// source=components/bundle.js
// component=Dialog
import figma from 'figma'
const instance = figma.selectedInstance
const title = instance.getString('Title')
const body = instance.getString('Body')
const tone = instance.getEnum('Tone', { Default: 'default', Danger: 'danger' })
const sheet = instance.getEnum('Type', { Dialog: false, Sheet: true })
let cancel, primary
const c = instance.findInstance('cancel')
if (c && c.type === 'INSTANCE') cancel = c.executeTemplate().example
const p = instance.findInstance('primary')
if (p && p.type === 'INSTANCE') primary = p.executeTemplate().example

export default {
  example: figma.code`<Dialog
  open={open}
  onClose={() => setOpen(false)}${tone === 'danger' ? `
  tone="danger"` : ''}${sheet ? `
  sheet` : ''}
  title="${title}"
  actions={<>
    ${cancel}
    ${primary}
  </>}
>
  <p>${body}</p>
</Dialog>`,
  imports: ['const { Dialog, Button } = window.Areeba'],
  id: 'dialog',
  metadata: { nestable: true },
}
