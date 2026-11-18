// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=40-356
// source=components/bundle.js
// component=Panel
import figma from 'figma'
const instance = figma.selectedInstance
const title = instance.getString('Title')
const desc = instance.getBoolean('Show description') ? ` description="${instance.getString('Description')}"` : ''
const action = instance.getBoolean('Show action') ? ' actions={<Button variant="ghost" size="sm">Edit</Button>}' : ''
const footer = instance.getBoolean('Show footer') ? ' footer={<><Button variant="secondary">Cancel</Button><Button>Save changes</Button></>}' : ''
const content = instance.findInstance('content')
const body = content ? content.executeTemplate().example : ''

export default {
  example: figma.code`<Panel title="${title}"${desc}${action}${footer}>
  ${body}
</Panel>`,
  imports: ['const { Panel, Button } = window.Areeba'],
  id: 'panel',
  metadata: { nestable: true },
}
