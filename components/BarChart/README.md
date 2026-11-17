# BarChart

Compares amounts across categories (days, stores, channels), single or grouped, with a tooltip per group on hover.

- Bars start at zero, have 4px rounded tops, and grouped bars sit 2px apart.
- Series colours follow `chart-1` → `chart-4` in order; the current period is `chart-1` (Crimson Deep in light, Chalk in dark).
- Up to ~12 categories; beyond that sort them and show the top 10 plus "Other", or use a horizontal list.
- Don't use status colours for bars. If a bar means "failed", label it.
- Right-to-left: the chart mirrors: y-axis on the right, categories running right to left, `chart-1` the rightmost bar in each group.
