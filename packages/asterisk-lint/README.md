# @areebadigital/asterisk-lint

Lint presets that keep product code on areeba Asterisk 4.

```js
// stylelint.config.js: tokens only, logical CSS (start/end), motion tokens
export default { extends: ['@areebadigital/asterisk-lint/stylelint'] };

// eslint.config.js: no native <select>, date inputs or toggles; no raw colours or left/right in inline styles
import asterisk from '@areebadigital/asterisk-lint/eslint';
export default [...asterisk];
```
