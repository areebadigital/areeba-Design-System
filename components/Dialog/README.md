# Dialog

A modal that asks for a decision or a short focused task. On mobile pass `sheet` to render it as a bottom sheet.

- Title asks the question or names the task; body explains the consequence in one or two sentences.
- Actions sit bottom-right (SaaS) or stacked full-width (sheet), primary last on desktop and on top in sheets. Button labels repeat the verb: "Freeze card", not "OK".
- `tone="danger"` sets `role="alertdialog"`; pair it with a `danger` Button.
- Escape and a backdrop click call `onClose`. The consumer controls `open` and should return focus to the trigger on close.
- Uses `radius-xl` and `shadow-3` over a 56% night scrim.
