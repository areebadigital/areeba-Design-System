# Alert

An inline message about the state of the system or the user's last action.

- Title states what happened; body says what it means or what to do next.
- `danger` uses `role="alert"` (interrupts screen readers); the others use `role="status"`.
- Place at the top of the content it concerns. For transient confirmations on mobile, prefer a toast; keep Alerts for things that persist until resolved.
