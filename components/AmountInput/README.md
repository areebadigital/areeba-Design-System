# AmountInput

The big amount on top up, send and request screens, with the fee and the limits under it.

- `value` is a plain number string ("1250.5"); the field shows it grouped ("1,250.5") and always left-to-right, also in Arabic.
- Typed entry uses the decimal keyboard (`inputMode="decimal"`). On phone flows drive it from a `NumberPad` and set `readOnly`, with `padInput()` to apply each key.
- `fee={0}` shows "Free" in `success`; otherwise pass the fee text. `hint` shows the limits ("Min $20 · Max $2,500"); `error` replaces it and is announced.
- Disable Continue until the amount is inside the limits.

From the areeba pay app, restyled to the system tokens.
