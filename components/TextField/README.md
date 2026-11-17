# TextField

A labelled single-line input with optional prefix, hint and error message.

- Always pass a visible `label`; placeholders are examples, never labels.
- Use `prefix` for currency symbols and `inputMode="decimal"` for amounts so mobile shows the number pad.
- `error` replaces the hint, turns the border `danger` and is announced via `aria-describedby`. Say what's wrong and how to fix it.
- Matches the Figma Input field: 44px (`size-control-md`), `radius-xs`, `surface-field` (Chalk) fill, 14/20 medium label in `ink-muted`, 16/24 input text so iOS does not zoom. The border is `line-strong` (3:1); Figma's Chalk-on-Chalk edge is only 1.1:1 against white.

The consumer provides `value`/`onChange` (or `defaultValue`) and validation.
