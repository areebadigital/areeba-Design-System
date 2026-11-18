# Pagination

Page numbers under a long table: transactions, payouts, customers.

- `page` is 1-based. Give `pageCount`, or `total` and `pageSize`, which also shows the range ("26–50 of 1,284").
- Previous and next are labelled for screen readers; the current page has `aria-current="page"`. Long ranges collapse with an ellipsis: 1 … 4 5 6 … 52.
- In right-to-left the order mirrors: previous is on the right, as in Arabic books. The numbers stay 0–9.
- Keep filters and sorting when the page changes, and move focus to the top of the table.
