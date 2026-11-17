# DatePicker

A field that opens a month calendar for choosing one date. `Calendar` is exported on its own for inline use.

- Weeks start on Monday; dates display as "20 Nov 2026". The field is a button, so people never type a date in an ambiguous format.
- The trigger matches the Figma Input field (44px, `radius-xs`, `surface-field`). The calendar is drawn by areeba, never the native date input. Opening it moves focus to the selected day.
- Today is ringed; the selected day is `brand` (Crimson Deep). Use `min`/`max` to disable dates that can't be chosen (e.g. past settlement dates).
- Closes on selection, Escape or an outside click. On mobile, consider showing `Calendar` inside a bottom-sheet Dialog.
- For ranges (statements, reports), pair two DatePickers ("From", "To") until a range picker exists.
