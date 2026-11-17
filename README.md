# areeba

One design language for every areeba product: consumer and merchant **mobile apps**, **SaaS dashboards** for banks and merchants, and the marketing surfaces around them. It is built for money: calm, legible, precise, with the areeba red reserved for the moments that matter.

> Status: v1 foundation. The palette and type are a proposed starting point; swap in official brand values in `tokens.json` and everything downstream updates.

## Principles

1. **Clarity over decoration.** People act on money. Every screen answers "how much, to whom, what's next" before anything else.
2. **Red means go, sparingly.** `brand` marks the single primary action and the current location. If everything is red, nothing is.
3. **Numbers are first-class.** Amounts use the Numbers styles with tabular figures, right-aligned in lists, never truncated.
4. **One system, two densities.** Mobile is roomy (48px controls, `body-lg`); SaaS is compact (40px controls, `body`). Same tokens, same components.
5. **Trust is visible.** Status is always colour *plus* a word or icon. Errors explain what happened and what to do.

## Voice and content

- Plain, warm, direct. Write like a helpful teller, not a bank letter.
- Sentence case everywhere: "Send money", not "Send Money".
- Buttons start with a verb and name the outcome: "Pay $42.00", "Freeze card", "Export CSV".
- Amounts: currency symbol + tabular digits, minus sign `−` (U+2212) for debits, two decimals. `−$42.00`, `+$1,250.00`.
- Dates: "Today, 14:32", "12 Nov", "12 Nov 2025" when not this year. 24-hour time.
- Errors: what happened, then the fix. "Card declined. Check your balance or try another card."
- Arabic and French are first-class: design every layout to mirror for RTL and to absorb 30% longer strings.

## Colour

| Role | Tokens | Rule |
| --- | --- | --- |
| Identity | `brand`, `night`, `brand-soft`, `mint` | Red for primary actions and selection. Night navy for card faces, hero panels and the SaaS sidebar. |
| Surfaces | `surface`, `surface-sunken`, `surface-raised` | Mobile screens sit on `surface`; SaaS pages sit on `surface-sunken` with `surface-raised` cards. |
| Text | `ink`, `ink-muted`, `ink-disabled` | All text pairs pass 4.5:1 in both themes, except `ink-disabled`. |
| Lines | `line`, `line-strong` | `line` is decorative. Interactive borders use `line-strong` (3:1). |
| Status | `success`, `warning`, `danger`, `info` + `-soft` | Always with an icon or word. `danger` is deliberately darker than `brand` so the two never blur. |
| Focus | `focus` | 2px ring, 2px offset, on every interactive element. |

Dark theme is a full theme, not an inversion: brand lightens to `#ff4d5e` and `on-brand` flips to near-black to keep 6:1.

## Typography

**Plus Jakarta Sans** (Google Fonts) for everything; **IBM Plex Mono** for IDs and API keys. Load:
`https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400&display=swap`

- Mobile body is `body-lg` (17px); SaaS body is `body` (15px).
- Headings are bold (700) with slight negative tracking. Never more than three heading levels on a screen.
- Amounts: `amount-xl` for the balance hero, `amount` in lists. Always `font-variant-numeric: tabular-nums`.

## Layout and spacing

- 4px grid. Mobile gutters `space-4`; SaaS gutters `space-6`, page top `space-10`.
- Mobile: single column, bottom `TabBar` with 3–5 destinations, primary action pinned above the safe area.
- SaaS: 240px `night` sidebar from `bp-lg`, content max-width `bp-xl`, 12-column grid with `space-6` gutters.
- Touch targets ≥ 44px. Default mobile controls use `size-control-lg`.

## Shape and elevation

Friendly but precise: `radius-md` for controls, `radius-lg` for cards, `radius-xl` for sheets, `radius-full` for pills, switches and avatars. Payment cards are always `radius-lg` at the ISO 1.586 ratio.
Elevation is quiet: `shadow-1` for cards, `shadow-2` for floating menus and the tab bar, `shadow-3` for dialogs and sheets. In dark mode, separate surfaces with `line` rather than heavier shadows.

## Data visualisation

Charts use their own four-colour series palette, `chart-1` to `chart-4` (red, blue, teal, amber), always assigned in that order and checked for colour-blind separation in both themes. `chart-1` is the brand red and always marks the main subject. Status colours never mark a series. Gridlines use `chart-grid`, and text stays in `ink` / `ink-muted`, never the series colour. Every chart has one y-axis starting at zero, a legend when there are 2+ series, and a hover tooltip.

## Iconography

Outline icons on a 24px grid, 20px live area, 1.75px stroke, round caps and joins, `currentColor`. Filled variants only for the active tab-bar item. Recommended set until a custom one exists: Lucide (outline style matches). Icons never stand alone for destructive actions; pair them with a label.

## Logo

No logo files are in this system yet. Until the official marks are uploaded to an `assets/Logos` group, render the name in plain text, lowercase "areeba", Plus Jakarta Sans 700, in `ink` or `on-night`. Never redraw or approximate the logo.

## Motion

Fast and functional: 150ms for hover and press, 250ms ease-out for sheets and page transitions, respect `prefers-reduced-motion`. Success confirmations may use one 400ms check animation; nothing loops.

## Components

| Component | Use it for |
| --- | --- |
| Button | Every action. One `primary` per screen. |
| TextField | Text, amount and search input with label, hint and error. |
| Switch | Instant on/off settings (freeze card, notifications). |
| Badge | Transaction and account status. |
| Alert | Inline system messages. |
| Tabs | Segmented switching between views of the same data. |
| ListItem | Transactions, accounts, settings rows. |
| TabBar | Mobile bottom navigation. |
| Sidebar | SaaS primary navigation on `night`. |
| DataTable | Transactions, payouts and logs in SaaS. |
| Dialog | Confirmations and focused tasks; bottom sheet on mobile. |
| Toast | Short confirmations after an action. |
| PaymentCard | Card visuals in wallets and card screens. |
| EmptyState | First-run and no-results screens. |
| Checkbox | Multi-select, row selection and consent. |
| Select | Choosing one of 4–15 known options. |
| DatePicker | Picking a single date from a calendar. |
| LineChart | Trends over time, up to four series. |
| BarChart | Comparing amounts across categories. |

React components ship in `components/bundle.js` under `window.Areeba`; all styling is in `components/bundle.css` and reads only tokens, so it works in any web stack. For native iOS/Android, map the same tokens to your platform theme.
