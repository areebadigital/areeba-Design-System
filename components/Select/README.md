# Select

A dropdown for choosing one option from a list of 4–15 known values.

- A custom listbox, not the native `<select>`: areeba draws every control itself so it looks the same on every platform. It follows the WAI-ARIA "select-only combobox" pattern: arrow keys, Home/End, Page Up/Down, Enter/Space, Escape, Tab and type-to-jump all work, and screen readers announce the active option.
- 2–3 options: use Tabs or radio-style choices instead. More than ~15, or anything searchable (countries, merchants): use a searchable combobox.
- Same box as TextField (Figma Input field): 44px (`size-control-md`), `radius-xs`, `surface-field` fill, `line-strong` border, label above, hint or error below. The selected option is `brand` with a tick.
- `placeholder` shows in `ink-muted` until something is chosen; use it when there's no sensible default.
- `onChange(value, option)` receives the option's value, not a DOM event. Pass `name` to submit the value in a form (a hidden input carries it).
