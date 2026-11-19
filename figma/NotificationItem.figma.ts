// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=36-483
// source=components/bundle.js
// component=NotificationItem
import figma from 'figma'
const instance = figma.selectedInstance
const type = instance.getEnum('Type', { Info: 'info', Request: 'request', Accepted: 'accepted', Declined: 'declined' })
const title = instance.findText('title').textContent
const body = instance.findText('body').textContent
const time = instance.findText('time').textContent
const lead = type === 'info' ? ' icon="card"' : ` avatar={<Avatar initials="${type === 'declined' ? 'KH' : 'SA'}" size="sm" />}`
const unread = type === 'info' || type === 'request' ? ' unread' : ''
const tail = type === 'request' ? ' actions={<><Button variant="secondary" size="sm">Decline</Button><Button size="sm">Accept</Button></>}'
  : type === 'accepted' ? " status={{ tone: 'success', label: 'Accepted' }}" : type === 'declined' ? " status={{ tone: 'danger', label: 'Declined' }}" : ''

export default {
  example: figma.code`<NotificationItem title="${title}" time="${time}"${lead}${unread}${tail}>${body}</NotificationItem>`,
  imports: ['const { NotificationItem, Avatar, Button } = window.Areeba'],
  id: 'notification-item',
  metadata: { nestable: true },
}
