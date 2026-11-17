# Switch

An on/off toggle for settings that take effect immediately.

- Use for instant settings: freeze card, contactless, notifications. If the change needs a Save button, use a checkbox instead.
- The label names the setting, not the state ("Freeze card", not "Card is frozen").
- On uses `brand`; off uses `line-strong`. Renders a real checkbox with `role="switch"`, so keyboard and screen readers work.
- For high-risk changes (e.g. disabling 3-D Secure) confirm in a dialog first.
