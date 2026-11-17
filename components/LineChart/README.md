# LineChart

Shows change over time for one to four series, with a crosshair tooltip on hover.

- Series take `chart-1` → `chart-4` in order. `chart-1` is always the main subject: Crimson Deep in light, Chalk in dark, so no line reads as an error. Never cycle the colours: a fifth series folds into "Other" or a second chart.
- With 2+ series there's a legend and each line is labelled at its end. One series: no legend, the title names it.
- One y-axis only, starting at zero; 2px lines, recessive `chart-grid`. Pass `format` for currency.
- Width fills its container. Pair with a table or CSV export for exact values.
- Right-to-left: the chart mirrors: y-axis on the right, time running right to left, line labels on the left, tooltip opening leftwards. Amounts in the tooltip stay left-to-right.
