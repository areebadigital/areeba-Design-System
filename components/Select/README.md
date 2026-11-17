# Select

A dropdown for choosing one option from a list of 4–15 known values.

- Built on the native `<select>`: on mobile it opens the platform picker, and keyboard and screen readers work out of the box.
- 2–3 options: use Tabs or radio-style choices instead. More than ~15, or anything searchable (countries, merchants): use a combobox.
- Same box as TextField: 48px, `radius-md`, `line-strong` border, label above, hint or error below.
- `placeholder` adds a disabled first option; use it when there's no sensible default.
