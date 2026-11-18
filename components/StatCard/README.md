# StatCard

A key number on a dashboard: volume, transactions, refunds.

- `label` names the number, `value` is formatted and tabular, `change` compares with the previous period: `{ direction: 'up' | 'down' | 'flat', value, label, good }`.
- Change is an arrow and a word ("+12.4% vs October"), never colour alone. Colour only when you know what is good: `good: true` is `success`, `good: false` is `danger` (fewer refunds can be good).
- 3–4 per row in a `.ar-stats` grid, above the chart they summarise.

From the areeba pay app, restyled to the system tokens.
