# Panel

A titled surface for a part of a page: a form section, a summary, a short list, a table.

- `title` is the panel's `h2` (sentence case); `description` adds one line under it. `actions` sit at the end of the header: a link, a secondary button, an ActionMenu.
- `footer` holds the form's buttons, primary last (Cancel, then Save). It sits on `surface-sunken` under a divider.
- `flush` removes the body padding so a DataTable, List or SettingsList runs edge to edge.
- Put panels in `.ar-app-split` (main and side columns) or `.ar-app-narrow` (settings). One idea per panel; do not nest panels.
