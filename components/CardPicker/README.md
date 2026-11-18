# CardPicker

Choose one card: where money comes from or goes to.

- A WAI-ARIA radio group: arrows move and choose, Space chooses, Tab leaves the group. Pass `name` to submit the value in a form (a hidden input carries it).
- Each card shows a mini card face, the last four digits and the balance, left-to-right in every language. Disabled cards stay listed with a reason (`note`).
- Under ~6 cards. For more, or for adding a new card, use a list screen.
- `onChange(value, card)` receives the card's value.

From the areeba pay app, restyled to the system tokens.
