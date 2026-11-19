// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=43-710
// source=components/bundle.js
// component=FileUpload
import figma from 'figma'
const instance = figma.selectedInstance
const label = instance.getString('Label')
const hint = instance.getString('Hint')
const error = instance.getEnum('State', { Default: false, Error: true })
const files = instance.findConnectedInstances(() => true).map((n) => n.executeTemplate().metadata.props).filter((p) => p && p.file).map((p) => p.file)

export default {
  example: error
    ? figma.code`<FileUpload label="${label}" accept=".pdf,.jpg,.png" maxSize={10485760} error="${hint}" onChange={setFiles} />`
    : figma.code`<FileUpload label="${label}" hint="${hint}" accept=".pdf,.jpg,.png" maxSize={10485760} multiple files={[
  ${files.join(',\n  ')},
]} onChange={setFiles} />`,
  imports: ['const { FileUpload } = window.Areeba'],
  id: 'file-upload',
  metadata: { nestable: true },
}
