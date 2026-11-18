# SettingsList

Grouped rows for settings, profile and "More" screens. `SettingsList` is the titled group; `SettingsRow` is one row.

- A row is a link (`href`), a button (`onClick`, with a chevron), a switch (`toggle: { checked, onChange }`) or plain info (`value`). The row label names the switch.
- `description` adds one line under the label; `badge` flags something new; `tone="danger"` for Report stolen and Sign out (put them last).
- Group by topic (Account, Notifications, Security), 2–6 rows per group, titles in sentence case.
- Chevrons flip in right-to-left.

From the areeba pay app, restyled to the system tokens.
