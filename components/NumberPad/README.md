# NumberPad

A number pad for amounts and passcodes on phone screens.

- `onKey` receives "0"–"9", "." (with `decimal`) and "back". For amounts pass each key to `padInput(value, key)`, which keeps one decimal point, two decimals and no leading zeros.
- Digits are always 0–9 and the pad stays left-to-right in Arabic, like phone keypads.
- Keys are 56px tall on `surface-raised`; delete is labelled for screen readers.
- Use it where the system keyboard would cover the amount; on the web a decimal text input is enough.

From the areeba pay app, restyled to the system tokens.
