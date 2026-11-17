// url=https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ/areeba-Design-System-4.0?node-id=9-130
// source=components/bundle.js
// component=Button
import figma from 'figma'
const instance = figma.selectedInstance
const label = instance.getString('Label')
const variant = instance.getEnum('Variant', { Primary: 'primary', Secondary: 'secondary', Ghost: 'ghost', Danger: 'danger' })
const size = instance.getEnum('Size', { sm: 'sm', md: 'md', lg: 'lg' })
const disabled = instance.getEnum('State', { Default: false, Disabled: true })
let iconCode
if (instance.getBoolean('Show icon')) {
  const icon = instance.getInstanceSwap('Icon')
  if (icon && icon.type === 'INSTANCE') iconCode = icon.executeTemplate().example
}

export default {
  example: figma.code`<Button variant="${variant}"${size !== 'md' ? ` size="${size}"` : ''}${disabled ? ' disabled' : ''}>${iconCode ? figma.code`${iconCode} ` : ''}${label}</Button>`,
  imports: ['const { Button } = window.Areeba'],
  id: 'button',
  metadata: { nestable: true, props: { label, variant } },
}
