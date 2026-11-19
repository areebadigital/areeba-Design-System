# RadioGroup

Choose one of a few options you can see at once: a transfer type, a document type, a payout schedule.

- 2–6 options. For more, or when space is tight, use Select; for on/off, use Switch; for several choices, use Checkbox.
- A WAI-ARIA radio group drawn by areeba, no native inputs: the group is one tab stop, arrow keys move and choose (they follow reading direction), Space chooses. With `name`, the value travels in a hidden input.
- `label` names the group (a question or noun: "Transfer to"); `hint` and `error` sit under it, and the error is announced. Each option can carry its own `hint`.
- `variant="card"` draws bordered tiles for choices that need a line of explanation (bank account or areeba wallet). `orientation="horizontal"` puts short options in a row.
- Leave nothing selected only when there is no safe default; then mark the group `required` and say so in the error.
