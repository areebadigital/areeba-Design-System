// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=43-638
// source=components/bundle.js
// component=FileUpload
import figma from 'figma'
const instance = figma.selectedInstance
const name = instance.findText('name').textContent
const state = instance.getEnum('State', { Uploaded: 'done', Uploading: 'uploading', Error: 'error' })
const file = state === 'uploading' ? `{ name: '${name}', status: 'uploading', progress: 60 }`
  : state === 'error' ? `{ name: '${name}', status: 'error', error: 'This file type is not accepted.' }`
  : `{ name: '${name}', size: 1258291, status: 'done' }`

export default {
  example: figma.code`${file}`,
  imports: ['const { FileUpload } = window.Areeba'],
  id: 'file-upload-file',
  metadata: { nestable: true, props: { file } },
}
