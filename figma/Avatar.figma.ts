// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=35-395
// source=components/bundle.js
// component=Avatar
import figma from 'figma'
const instance = figma.selectedInstance
const size = instance.getEnum('Size', { sm: 'sm', md: 'md', lg: 'lg' })
const status = instance.getEnum('Status', { False: false, True: true })
const initials = instance.getString('Initials')

export default {
  example: figma.code`<Avatar initials="${initials}"${size !== 'md' ? ` size="${size}"` : ''}${status ? ' status' : ''} />`,
  imports: ['const { Avatar } = window.Areeba'],
  id: 'avatar',
  metadata: { nestable: true },
}
