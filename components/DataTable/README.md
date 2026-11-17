# DataTable

A compact table for transactions, payouts, merchants and logs in SaaS products.

- Header row on `surface-sunken`, `caption` style 12px semibold `ink-muted`; rows 44px with `line` dividers.
- Amounts: `align: 'right'` + `numeric: true` (tabular figures). IDs and references: `mono: true`.
- Status columns render a Badge via `render`.
- Wide tables scroll horizontally inside their card; never wrap amounts or IDs.
- `empty` sets the text for no rows; for a first-run empty page, use EmptyState instead.
- The consumer provides sorting, filtering and pagination around it.
