/* areeba Asterisk 4 Stylelint preset. In stylelint.config.js:  export default { extends: ['@areebadigital/asterisk-lint/stylelint'] } */
const physical = ['margin-left', 'margin-right', 'padding-left', 'padding-right', 'left', 'right', 'border-left', 'border-right',
  'border-left-width', 'border-right-width', 'border-left-color', 'border-right-color', 'border-top-left-radius', 'border-top-right-radius',
  'border-bottom-left-radius', 'border-bottom-right-radius'];
export default {
  rules: {
    // Colours come from tokens: var(--brand), var(--ink)…
    'color-no-hex': [true, { message: 'Use a colour token (var(--brand), var(--ink)…), not a hex value. Tokens follow light and dark.' }],
    'color-named': ['never', { message: 'Use a colour token, not a named colour.' }],
    'function-disallowed-list': [['rgb', 'rgba', 'hsl', 'hsla', 'cubic-bezier'], { message: 'Use tokens: colour tokens for colours, --ease-* for curves.' }],
    // Right-to-left: logical properties only.
    'property-disallowed-list': [physical, { message: 'Use logical properties (margin-inline-start, inset-inline-end, border-start-start-radius…) so the layout mirrors in Arabic.' }],
    'declaration-property-value-disallowed-list': [{ 'text-align': ['left', 'right'], float: ['left', 'right'], clear: ['left', 'right'] },
      { message: 'Use start/end instead of left/right so the layout mirrors in Arabic.' }],
    // Motion: durations from --duration-* tokens.
    'declaration-property-unit-disallowed-list': [{ transition: ['ms', 's'], 'transition-duration': ['ms', 's'], animation: ['ms', 's'], 'animation-duration': ['ms', 's'] },
      { message: 'Use the motion tokens (var(--duration-fast), var(--ease-standard)); reduced motion depends on them.' }],
  },
};
