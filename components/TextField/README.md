# TextField

A labelled single-line input with optional prefix, hint and error message.

- Always pass a visible `label`; placeholders are examples, never labels.
- Use `prefix` for currency symbols and `inputMode="decimal"` for amounts so mobile shows the number pad.
- `error` replaces the hint, turns the border `danger` and is announced via `aria-describedby`. Say what's wrong and how to fix it.
- Height is 48px (`size-control-lg`) on every platform; input text is 16px so iOS does not zoom.

The consumer provides `value`/`onChange` (or `defaultValue`) and validation.
