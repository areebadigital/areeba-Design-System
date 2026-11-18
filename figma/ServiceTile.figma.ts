// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=32-211
// source=components/bundle.js
// component=ServiceTile
import figma from 'figma'
const instance = figma.selectedInstance
const tone = instance.getEnum('Tone', { Brand: 'brand', Info: 'info', Success: 'success', Warning: 'warning' })
const initials = instance.getString('Initials')
const label = instance.getString('Label')
const description = instance.getString('Description')

export default {
  example: figma.code`<ServiceTile tone="${tone}" initials="${initials}" label="${label}" description="${description}" onClick={() => {}} />`,
  imports: ['const { ServiceTile } = window.Areeba'],
  id: 'service-tile',
  metadata: { nestable: true },
}
