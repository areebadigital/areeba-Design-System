# Meter

How much of something is used: a monthly limit, a payout threshold, onboarding steps.

- A WAI-ARIA meter. `value` and `max` set the fill; `valueText` is shown and read out ("$3,200 of $5,000"), so always say the numbers, not just the bar.
- The fill is `brand`, turns `warning` from 75% and `danger` from 90%. Set `tone="success"` for progress that is good to complete (onboarding).
- `hint` says what happens at the limit ("Resets on 1 December").
- Not for loading: use it only for amounts that mean something to people.
