# areeba

One design language for every areeba product: consumer and merchant **mobile apps**, **SaaS dashboards** for banks and merchants, and the marketing surfaces around them. It is built for money: calm, legible, precise, with the areeba red reserved for the moments that matter.

> Status: v2. Aligned with the official brand guidelines and page designs in Figma (Areeba x magier client file, Nov 2026): palette, type scale, logos, Checkbox, Input field and Button. Dark theme values are derived; Figma defines light only.

## Principles

1. **Clarity over decoration.** People act on money. Every screen answers "how much, to whom, what's next" before anything else.
2. **Crimson acts, Signal Red signs.** In a money product bright red reads as "error", so actions use Crimson Deep (`brand`), never Signal Red. Signal Red (`accent`) is the logo and a highlighted phrase in big headlines, nothing more. One primary action per screen.
3. **Numbers are first-class.** Amounts use the Numbers styles with tabular figures, right-aligned in lists, never truncated.
4. **One system, two densities.** Mobile is roomy (48px controls, `body-lg`); SaaS is compact (44px controls, `body`). Same tokens, same components.
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
| Identity | `brand` (Crimson Deep `#630C0C`), `accent` (Signal Red `#FF2929`), `night` (Obsidian `#131210`), `brand-soft`, `mint` | Crimson for primary actions, selection and large colour sections. Signal Red only for the logo and highlighted headline words (24px+). Obsidian for card faces, dark sections and the SaaS sidebar. |
| Surfaces | `surface` (White), `surface-sunken` (Chalk `#F3F2EF`), `surface-raised`, `surface-field` | Pages sit on Chalk with White cards, as in the Figma designs. Inputs use `surface-field` with a `line-strong` border. |
| Text | `ink`, `ink-muted`, `ink-disabled` | All text pairs pass 4.5:1 in both themes, except `ink-disabled`. |
| Lines | `line`, `line-strong` | `line` is decorative. Interactive borders use `line-strong` (3:1). |
| Status | `success`, `warning`, `danger`, `info` + `-soft` | Always with an icon or word. `success` is Figma's "Live" green. `danger` is a bright alert red, kept clearly apart from the dark Crimson brand. |
| Focus | `focus` | 2px ring, 2px offset, on every interactive element. |

Dark theme is a full theme, not an inversion: surfaces are Obsidian, text is Chalk, and `brand` flips to a Chalk fill with Crimson text (11.8:1), the way Figma puts buttons on Crimson sections.

**Flagged pair (kept as Figma has it):** Signal Red on White is 3.75:1 and on Chalk 3.35:1. It passes only as large text (24px+) or a graphic, so it is never body text, a link or a button.

## Typography

**Plus Jakarta Sans** for everything, with Arial as the system fallback (Figma brand guidelines); **IBM Plex Mono** for IDs and API keys. Both ship as files in `fonts/` (SIL Open Font License) and `tokens.css` declares them with `@font-face`.

- The scale is Figma's: `display-xl`/`display-lg`/`display` = H1/H2/H3 (64, 48, 36px), `h1`/`h2`/`h3` = H4/H5/Text xl (30, 24, 20px), `body-lg`/`body`/`body-sm`/`caption` = Text lg/md/sm/xs (18, 16, 14, 12px).
- Mobile body is `body-lg` (18px); SaaS body is `body` (16px).
- Headings are Regular (400) with negative tracking on the large sizes, as in Figma. Weight comes from size, not boldness. Never more than three heading levels on a screen.
- Amounts: `amount-xl` for the balance hero, `amount` in lists. Always `font-variant-numeric: tabular-nums`.

## Layout and spacing

- 4px grid. Mobile gutters `space-4`; SaaS gutters `space-6`, page top `space-10`.
- Mobile: single column, bottom `TabBar` with 3–5 destinations, primary action pinned above the safe area.
- SaaS: 240px `night` sidebar from `bp-lg`, content max-width `bp-xl`, 12-column grid with `space-6` gutters.
- Touch targets ≥ 44px. Buttons and fields are 44px (`size-control-md`, Figma); mobile primary actions may use `size-control-lg` (48px).

## Shape and elevation

Precise: `radius-xs` (4px) for buttons, fields, checkboxes and menus, as in Figma; `radius-lg` for cards, `radius-xl` for sheets, `radius-full` for pills, switches and avatars. Payment cards are always `radius-lg` at the ISO 1.586 ratio.
Elevation is quiet: `shadow-1` for cards, `shadow-2` for floating menus and the tab bar, `shadow-3` for dialogs and sheets. In dark mode, separate surfaces with `line` rather than heavier shadows.

## Data visualisation

Charts use their own four-colour series palette, `chart-1` to `chart-4` (Crimson, blue, teal, amber), always assigned in that order and checked for colour-blind separation in both themes. `chart-1` is the brand colour (Crimson Deep in light, Chalk in dark) and always marks the main subject, so no series reads as an error. Status colours never mark a series. Gridlines use `chart-grid`, and text stays in `ink` / `ink-muted`, never the series colour. Every chart has one y-axis starting at zero, a legend when there are 2+ series, and a hover tooltip.

## Iconography

Outline icons on a 24px grid, 20px live area, 1.75px stroke, round caps and joins, `currentColor`. Filled variants only for the active tab-bar item. Recommended set until a custom one exists: Lucide (outline style matches). Icons never stand alone for destructive actions; pair them with a label.

## Logo

The official marks are in `assets/Logos`, exported from Figma: the Signal Red wordmark for light backgrounds, the Chalk wordmark for dark or saturated ones, the contained version next to other brands, and the "a" logomark for tight spaces. Clear space equals the logo's height on every side. Never redraw, recolour or approximate the logo. There is no favicon yet (the Figma frames are empty placeholders).

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
| Select | Choosing one of 4–15 known options (custom listbox, no native dropdown). |
| DatePicker | Picking a single date from a calendar. |
| LineChart | Trends over time, up to four series. |
| BarChart | Comparing amounts across categories. |

Every control is drawn by areeba, never the browser's native widgets (no native dropdowns, date inputs or pickers); each follows the matching WAI-ARIA pattern so keyboard and screen readers still work. React components ship in `components/bundle.js` under `window.Areeba`; all styling is in `components/bundle.css` and reads only tokens, so it works in any web stack. For native iOS/Android, map the same tokens to your platform theme.

## Storybook

Every component, token and asset is documented in Storybook: each component's README is its docs page, every prop has a live control, and a toolbar switch flips light and dark. The accessibility addon runs axe on every story.

```bash
npm install
```

```bash
npm run storybook
```

`npm run build-storybook` writes a static site to `storybook-static/`. Stories live in `stories/`; they load the real `components/bundle.js`, so Storybook always shows what ships.
