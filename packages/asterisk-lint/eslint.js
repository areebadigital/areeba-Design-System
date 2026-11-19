/* areeba Asterisk 4 ESLint preset (flat config). In eslint.config.js:
     import asterisk from '@areebadigital/asterisk-lint/eslint';
     export default [...asterisk];
   It forbids native controls the system replaces, raw colours in inline styles, and Signal Red on actions. */
const selector = (s, message) => ({ selector: s, message });
const nativeControls = [
  selector("JSXOpeningElement[name.name='select']", 'Use Select from @areebadigital/asterisk-react; native <select> is not allowed.'),
  selector("JSXOpeningElement[name.name='input'] > JSXAttribute[name.name='type'][value.value=/^(date|datetime-local|month|week|time|color|range|checkbox|radio)$/]",
    'Use DatePicker, Checkbox, RadioGroup or Switch from @areebadigital/asterisk-react; native pickers and toggles are not allowed.'),
  selector("JSXAttribute[name.name='style'] Property > Literal[value=/#[0-9a-fA-F]{3,8}\\b|rgba?\\(/]", 'Use a colour token (var(--brand)), not a raw colour.'),
  selector("JSXAttribute[name.name='style'] Property[key.name=/^(marginLeft|marginRight|paddingLeft|paddingRight|left|right)$/]", 'Use logical properties (marginInlineStart, insetInlineEnd) so the layout mirrors in Arabic.'),
  selector("JSXOpeningElement[name.name=/^(Button|IconButton|QuickAction)$/] > JSXAttribute[name.name='style'] Property[key.name=/^(background|backgroundColor|color)$/] Literal[value=/accent/]",
    'Signal Red (accent) is never an action colour. Buttons use brand.'),
];
export default [{
  files: ['**/*.{js,jsx,ts,tsx}'],
  languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
  rules: { 'no-restricted-syntax': ['error', ...nativeControls] },
}];
