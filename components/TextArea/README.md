# TextArea

Several lines of text: a note to the recipient, the reason for a refund, an address.

- A real `<textarea>`: text entry is the one native control the system keeps. Always pass a visible `label`; the placeholder is an example.
- `maxLength` adds a live counter ("42 of 140 characters") that turns `danger` at the limit and is read to screen readers.
- `hint` and `error` work as in TextField. Say what is wrong and how to fix it.
- Starts at 4 rows (`rows`) and can be resized vertically. Use TextField for one line.
