# NotificationItem

A notification or a money request in the notification centre.

- Title says what happened, with the amount ("Fouad El Mir sent you $100.00"); the body adds the note or the reason.
- `actions` holds the request's buttons (Decline, then Accept). Once answered, replace them with `status`: `{ tone, label }`, e.g. success "Accepted", danger "Declined", warning "Expired". Status is always a word and an icon.
- `unread` adds a `brand` dot and says "Unread" to screen readers. Group items under Today and Earlier.
- `avatar` for people, `icon` for system messages.

From the areeba pay app, restyled to the system tokens.
