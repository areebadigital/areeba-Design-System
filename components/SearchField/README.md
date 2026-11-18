# SearchField

A search box for lists: transactions, merchants, beneficiaries.

- A real text input (`type="search"`), the one kind of control the system does not redraw. The clear button appears once there is text and returns focus to the field.
- `label` names it for screen readers ("Search transactions"); the placeholder is an example of what to type.
- Filter as people type, or on Enter for server searches. Show an EmptyState with "Clear search" when nothing matches.
- `onChange(value)` receives the text.

From the areeba pay app, restyled to the system tokens.
