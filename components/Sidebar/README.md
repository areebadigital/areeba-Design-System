# Sidebar

The SaaS app's primary navigation: a 240px `night` column fixed on the left from `bp-lg` up.

- 5–8 top-level destinations, icon + label. Group secondary items under Settings rather than adding more.
- The current page uses `brand` fill with `aria-current="page"`; others sit at 78% `on-night`.
- `count` shows a tabular number for queues (e.g. disputes awaiting review), not for totals.
- `footer` holds the merchant or org switcher. Below `bp-lg`, collapse to a 72px icon rail or a drawer.
- Pass `onChange` for client-side routing, or `href` per item for plain links.
