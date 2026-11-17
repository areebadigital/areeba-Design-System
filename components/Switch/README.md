# Switch

An on/off toggle for settings that take effect immediately.

- Use for instant settings: freeze card, contactless, notifications. If the change needs a Save button, use a checkbox instead.
- The label names the setting, not the state ("Freeze card", not "Card is frozen").
- On uses `brand` (Crimson Deep); off uses `line-strong`.
- No native input: it is a button with `role="switch"` and `aria-checked`, following the WAI-ARIA switch pattern. Space and Enter toggle it. `onChange(checked)` receives the new state; pass `name` to submit it in a form.
- For high-risk changes (e.g. disabling 3-D Secure) confirm in a dialog first.
- Right-to-left: the track mirrors, so "on" slides the knob to the left end.
