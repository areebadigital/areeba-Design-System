# ListItem

A row for transactions, accounts, contacts and settings, grouped inside `List`.

- `leading`: initials or an icon in a 40px circle. `title`: merchant or name. `subtitle`: date, method, category.
- `amount` uses tabular figures and right alignment. Prefix `+` for money in (renders `success`) and `−` (U+2212) for money out (stays `ink`; never red for ordinary spending).
- `trailing` holds a Badge for non-final states.
- Titles truncate with an ellipsis; amounts never truncate.
- Rows are separated by `line`; the group is a `radius-lg` card on `surface-raised`.
