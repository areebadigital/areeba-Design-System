# PaymentCard

A visual of a payment card for wallets, card lists and card detail screens.

- ISO ratio 1.586, `radius-lg`, 320px default width (scale with the container).
- `night` is the default face; `brand` for the primary or virtual card. Never more than two faces in one view.
- Only show the last four digits. Full numbers appear only behind a reveal action with re-authentication, never in this component.
- `frozen` adds an outlined label; the parent should also dim actions that don't apply.
- Replace the wordmark with the official logo file once uploaded.
- Right-to-left: the card does not mirror. It reads like the physical card in every language (`dir="ltr"`); only the "Frozen" tag follows the page language.
- `fluid` makes the card fill its container (up to 420px), as on a phone's home and card screens.
