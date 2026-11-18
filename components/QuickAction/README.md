# QuickAction

A labelled round action, the row under the balance in a card app: Top up, Send, More.

- Three or four per row inside `QuickActions` (a labelled group). Always icon and a short verb; never icon only.
- The circle is `brand` (Crimson Deep) with `on-brand` icon; disabled actions go `surface-sunken`.
- Put rarely used and dangerous actions (lock, report stolen) behind a "More" action that opens an `ActionMenu`.
- It forwards its ref, so it can be the trigger of an `ActionMenu` (see the Home block).

From the areeba pay app, restyled to the system tokens.
