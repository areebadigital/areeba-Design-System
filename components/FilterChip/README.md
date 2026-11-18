# FilterChip

A pill that filters a list: a period, a card, money in or out.

- Toggle filters use `selected` and announce it (`aria-pressed`). Selected chips are `brand` (Crimson Deep).
- Filters that open a picker (a date range, a card list) pass `hasPopup` (`"dialog"`, `"listbox"` or `"menu"`) and show a chevron; the label shows the current value ("1–30 Nov").
- Keep them in one scrolling row above the list. Show a "Clear filters" action once any is set.

From the areeba pay app, restyled to the system tokens.
