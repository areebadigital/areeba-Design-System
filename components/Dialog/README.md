# Dialog

A modal that asks for a decision or a short focused task. On mobile pass `sheet` to render it as a bottom sheet.

- Title asks the question or names the task; body explains the consequence in one or two sentences.
- Actions sit bottom-right (SaaS) or stacked full-width (sheet), primary last on desktop and on top in sheets. Button labels repeat the verb: "Freeze card", not "OK".
- `tone="danger"` sets `role="alertdialog"`; pair it with a `danger` Button.
- Escape and a backdrop click call `onClose`; the consumer controls `open`.
- Focus moves into the dialog when it opens (the first field, else the first button), Tab and Shift+Tab stay inside it, and focus returns to the button that opened it when it closes.
- Uses `radius-xl` and `shadow-3` over a 56% night scrim.
