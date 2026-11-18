# areeba

One design language for every areeba product: consumer and merchant **mobile apps**, **SaaS dashboards** for banks and merchants, and the marketing surfaces around them. It is built for money: calm, legible, precise, with the areeba red reserved for the moments that matter.

> Status: v2. Aligned with the official brand guidelines and page designs in Figma (Areeba x magier client file, Nov 2026): palette, type scale, logos, Checkbox, Input field and Button. Dark theme values are derived; Figma defines light only.

**Where it lives:** [Figma library: areeba Design System 4.0](https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ) · [Storybook](https://areebadigital.github.io/areeba-Design-System/) · `tokens.json` in this repo (the source of truth for both).

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
- Arabic and French are first-class: design every layout to mirror for RTL and to absorb 30% longer strings. See [Right-to-left](#right-to-left).

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

**Plus Jakarta Sans** for everything, with Arial as the system fallback (Figma brand guidelines); **IBM Plex Sans Arabic** for Arabic; **IBM Plex Mono** for IDs and API keys. All ship as files in `fonts/` (SIL Open Font License) and `tokens.css` declares them with `@font-face`. Plus Jakarta Sans has no Arabic letters, so the Arabic face is declared for Arabic code points only (`unicode-range`): the same `--font-sans` stack sets Latin in Jakarta and Arabic in Plex, even within one line.

- The scale is Figma's: `display-xl`/`display-lg`/`display` = H1/H2/H3 (64, 48, 36px), `h1`/`h2`/`h3` = H4/H5/Text xl (30, 24, 20px), `body-lg`/`body`/`body-sm`/`caption` = Text lg/md/sm/xs (18, 16, 14, 12px).
- Mobile body is `body-lg` (18px); SaaS body is `body` (16px).
- Headings are Regular (400) with negative tracking on the large sizes, as in Figma. Weight comes from size, not boldness. Never more than three heading levels on a screen.
- Amounts: `amount-xl` for the balance hero, `amount` in lists. Always `font-variant-numeric: tabular-nums`.
- Arabic is never letter-spaced (tracking breaks the joins between letters); `tokens.css` resets the tracked styles under `:lang(ar)`.

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

**App components** (patterns from the areeba pay app):

| Component | Use it for |
| --- | --- |
| AppHeader | The top bar of an app screen: back or avatar, title, notifications or close. `modal` for sheets. |
| IconButton | Icon-only actions in headers (back, close, download), always with a label. |
| QuickAction | The round labelled actions under the balance (Top up, Send, More). |
| ActionMenu | A short action menu behind a button (lock card, view PIN, report stolen). |
| ActionBar | Sticky bottom actions of a flow step. |
| Balance | The balance hero with a show/hide toggle. |
| SettingsList | Grouped settings, profile and "More" rows: links, switches, values, danger. |
| DetailList | Label/value rows for receipts and summaries. |
| FilterChip | Filters above a list, as toggles or picker triggers. |
| SearchField | Searching a list. |
| AmountInput | The big amount entry with fee and limits. |
| NumberPad | A number pad for amounts and passcodes; `padInput()` applies its keys. |
| CardPicker | Choosing which card pays or receives. |
| PageDots | Carousel position. |
| Result | The success or failure screen at the end of a flow. |
| Avatar | People and merchants: photo or initials. |
| CodeInput | One-time codes from SMS or email (paste and autofill work). |
| PasscodeDots | Passcode progress above the number pad. |
| NotificationItem | Notifications and money requests, with Accept/Decline and how they ended. |
| ServiceTile | Grids of services and categories (eStore, bills). |
| StatCard | Dashboard key numbers with change against the last period. |
| CopyCode | Voucher codes, references and IBANs to copy. |

Every control is drawn by areeba, never the browser's native widgets (no native dropdowns, date inputs or pickers); each follows the matching WAI-ARIA pattern so keyboard and screen readers still work. React components ship in `components/bundle.js` under `window.Areeba`; all styling is in `components/bundle.css` and reads only tokens, so it works in any web stack. For native iOS/Android, map the same tokens to your platform theme.

## Blocks

Whole screens built only from areeba components, ready to copy, like shadcn/ui blocks. Each is one file in `blocks/` (JSX, `window.Areeba` components, English and Arabic copy picked from `<html lang>`), and its Storybook page shows that file, so the code you copy is the code that runs.

| Block | What it shows |
| --- | --- |
| Mobile / Home | Balance, card, quick actions with the card menu, today's activity, tab bar. |
| Mobile / Card details | Card actions, card settings with the danger action last, recent card activity. |
| Mobile / Activity | Search, filter chips, transactions grouped by day with totals, empty state. |
| Mobile / Activity details | One transaction as a sheet; pending and declined. |
| Mobile / Top up | The full flow: method, card, amount on the number pad, confirm, done. |
| Mobile / Sign in | Phone number and password, forgotten password, sign up. |
| Mobile / Passcode | Unlock with six digits or Face ID; wrong tries; locked with a reset link. |
| Mobile / Verify code | The SMS one-time code before a transfer or on a new device. |
| Mobile / Send money | Who, how much and why, confirm (3 days to accept), done. |
| Mobile / Notifications | Money requests to accept or decline, and how earlier ones ended. |
| Mobile / Profile | Account, notifications, security, help and sign out. |
| Mobile / eStore vouchers | Services, voucher prices in USD and LBP, confirm with a card, the code to copy. |
| SaaS / Transactions | Merchant portal: key numbers, daily volume, the transactions table with filters and export. |

The mobile blocks follow the layouts and flows of the areeba pay app, restyled to the system: actions in Crimson Deep, spending in ink, digits 0–9 in Arabic too. They are stories, so the screenshot tests check each in light, dark and right-to-left.

## Right-to-left

Set `dir="rtl"` and `lang="ar"` on `<html>` and every component mirrors: layout uses logical properties (start/end), never left/right.

- **Mirrors:** reading order, alignment, the sidebar, tab bar and list rows, the switch (on is the left end), dialog actions, the calendar grid (week starts on the right) and its previous/next arrows and arrow keys, and charts (y-axis on the right; days and months run right to left).
- **Does not mirror:** icons that show an object (card, send, chart), the logo, phone numbers, and the payment card, which reads like the physical card in every language.
- **Amounts and codes stay left to right.** `−$42.00`, `+$1,250.00`, IBANs, card and reference numbers keep their order inside Arabic text. Components that display amounts isolate them already (ListItem, DataTable numeric and mono columns, Sidebar counts, chart tooltips). For an amount you put inside a translated sentence, use `Areeba.ltr()`: `` `المتاح: ${ltr('$12,480.50')}` ``. Without it the browser shows "12,480.50$".
- **Digits are 0–9** in every language, matching how amounts are written; Arabic month and weekday names come from `Intl` (`DatePicker` and `Calendar` follow `<html lang>`, or a `locale` prop).
- **Built-in words follow `<html lang>`** in English and Arabic: navigation labels, "No results", the Select placeholder, the card's "Frozen" tag and the calendar's labels. Every one can be overridden by a prop.

Storybook's **Direction** toolbar switch mirrors every story and shows Arabic copy (from `stories/i18n.js`); **Guides / Right-to-left** shows full Arabic mobile and SaaS screens. Add new story strings to `stories/i18n.js`.

## Storybook

Every component, token and asset is documented in Storybook: each component's README is its docs page, every prop has a live control, and a toolbar switch flips light and dark. The accessibility addon runs axe on every story.

```bash
npm install
```

```bash
npm run storybook
```

`npm run build-storybook` writes a static site to `storybook-static/`. The `Storybook` GitHub Actions workflow builds it on every pull request and publishes it from `main` to https://areebadigital.github.io/areeba-Design-System/ (GitHub Pages). Stories live in `stories/`; they load the real `components/bundle.js`, so Storybook always shows what ships.

### Screenshot tests

The `Screenshot tests` workflow renders every story in light, dark and right-to-left (Arabic) on each pull request. It compares them with the reference screenshots in `tests/visual/__screenshots__`, and checks for errors, accessibility violations (axe), horizontal overflow and English left on Arabic screens. When a change is intended, add the `update-screenshots` label to the pull request to regenerate them on its branch. Details: [`tests/visual/README.md`](tests/visual/README.md).

## Figma

The design library is [areeba Design System 4.0](https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ). It mirrors this repo: every token is a Figma variable with light and dark modes (code syntax `var(--token)`), the type scale and shadows are styles, and every component is built from those variables, with its README as the description and a link to its Storybook page.

| Figma page | Components |
|---|---|
| Foundations | Colour, type, spacing, radius, size, elevation |
| Logos & Icons | The four logo files and the icon set |
| Actions | Button, IconButton, QuickAction, ActionMenu, ActionBar, ServiceTile |
| Inputs | TextField, Select, Checkbox, Switch, DatePicker (Calendar), SearchField, FilterChip, AmountInput, NumberPad, CardPicker (MiniCard), CodeInput, PasscodeDots |
| Status | Badge, Alert, Toast, EmptyState, Result, NotificationItem |
| Data display | ListItem and List, DataTable, PaymentCard, Balance, DetailList, SettingsList (SettingsRow), PageDots, Avatar, StatCard, CopyCode |
| Charts | LineChart, BarChart |
| Navigation | Tabs, TabBar, Sidebar, AppHeader |
| Overlays | Dialog (dialog and bottom sheet) |

When a token or component changes here, change the Figma library to match and publish it.

### Code Connect

`figma/` holds a Figma Code Connect template for every component and exported icon, so Dev Mode shows the real `window.Areeba` code for whatever is selected (for example `<Button variant="danger">Freeze card</Button>`) instead of generated CSS. `figma.config.json` points the Code Connect CLI at them.

Code Connect needs the library to be on a Figma Organization or Enterprise plan; the current team plan refuses it. Once upgraded, publish the templates with a Figma access token that has Code Connect write scope:

```bash
FIGMA_ACCESS_TOKEN=<token> npx @figma/code-connect connect publish
```

When you add or change a component's Figma properties or code props, update its template in `figma/` too.
