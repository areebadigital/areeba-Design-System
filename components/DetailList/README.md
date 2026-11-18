# DetailList

Label and value rows: a receipt, a transfer summary, transaction details.

- Items: `{ label, value, icon, ltr, emphasis }`. `ltr` isolates amounts and card numbers so they keep their order in Arabic; `emphasis` makes a bold total row with a divider.
- Values can be any node: a Badge for status, a category tag with an icon.
- Labels are nouns ("Original amount"); values are short. Keep long text out; link to it instead.

From the areeba pay app, restyled to the system tokens.
