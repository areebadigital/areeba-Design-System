# IconButton

A round button with only an icon: back, close, notifications, download.

- `label` is required: it is the button's accessible name ("Back", "Notifications, 2 unread"). Icons without words need it.
- `badge` adds an unread dot in `brand`. Say the count in `label` too; the dot alone is not announced.
- `variant="plain"` drops the background for inline use (the balance eye toggle).
- 40px round on `surface-sunken`; keep it in headers and toolbars, not for a screen's main action (use Button).
- Arrows that mean back or forward (`back`, `forward`, `chevronRight`) flip in right-to-left automatically.

From the areeba pay app, restyled to the system tokens.
