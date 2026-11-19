# areeba Asterisk 4: instructions for coding agents

You are working in a product that uses **areeba Asterisk 4**, areeba's design system (web, SaaS portals, React Native, Kotlin card machines). Use it instead of writing UI from scratch.

## Set up (web, React 18+)

```bash
npm install @areebadigital/asterisk-react @areebadigital/asterisk-tokens
```

```js
import '@areebadigital/asterisk-tokens/tokens.css';   // CSS variables, fonts, light and dark
import '@areebadigital/asterisk-react/styles.css';     // component styles (read only tokens)
import { AsteriskProvider, Button, TextField, Select } from '@areebadigital/asterisk-react';
```

- Theme: `data-theme="light"` or `"dark"` on `<html>` (or follow the system). Direction and language: `dir` and `lang` on `<html>`.
- React Native: `@areebadigital/asterisk-native` (same component names and props, `onPress`/`onChangeText`; wrap the app in its `AsteriskProvider`). Tokens: `import { light, dark } from '@areebadigital/asterisk-tokens/native'`.
- Kotlin card machines: `com.areeba.asterisk:asterisk-compose` (wrap screens in `AsteriskTheme`; `Keypad`, `AmountDisplay`, `CardPrompt`, `PaymentResult`, `CustomerDisplay` for the second screen). Tokens: `com.areeba.asterisk:asterisk-tokens` (`AsteriskTokens.Light.brand`, `AsteriskTokens.Space.S4`).

## Where to look

- `llms.txt` (in this package): every component in one line, with its props, and every block.
- `dist/components.json`: the same as data (name, group, summary, rules, props, docs link).
- `dist/index.d.ts`: full types with comments. Controlled (`value` + `onChange`) or uncontrolled (`defaultValue`); `onChange` receives the value, not a DOM event.
- Storybook: https://areebadigital.github.io/areeba-Design-System/ (each component's README is its docs page; Guides cover writing amounts and errors, dialogs vs sheets, status colours, motion and analytics).

## Rules (follow these in every product)

1. **Use the components.** Import from `@areebadigital/asterisk-react`; do not rebuild buttons, fields, selects, dialogs or menus. Never use native `<select>`, date inputs or pickers: use `Select`, `DatePicker`, `RadioGroup`, `Checkbox`, `Switch`. Text entry uses `TextField`, `TextArea`, `AmountInput`, `CodeInput`, `SearchField`.
2. **Tokens only.** Colours, spacing, radius, type, shadows and motion come from CSS variables (`var(--brand)`, `var(--space-4)`, `var(--duration-fast)`). No hex values, no raw `ms`, no `cubic-bezier()` in product code.
3. **Crimson acts, Signal Red signs.** Actions and selection use `brand` (Crimson Deep). `accent` (Signal Red) is only the logo and large headline highlights, never a button, link or status.
4. **Money is never ambiguous.** Amounts use the currency symbol, two decimals, the minus sign `−` for debits and tabular digits; spending is ink, not red; credits are `success` with `+`. Never truncate an amount.
5. **Arabic is first-class.** Set `dir="rtl"` and `lang="ar"` on `<html>`. Use logical CSS (`margin-inline-start`, `inset-inline-end`, `text-align: start`), never left/right. Keep amounts, IBANs, card and reference numbers left-to-right (`dir="ltr"` or `ltr()`). Digits are 0–9 in every language. Every string needs an Arabic translation.
6. **Accessible by default.** Every control has a visible label (or `label` on icon-only buttons). Status is a word or icon plus colour, never colour alone. Errors say what happened and what to do.
7. **Analytics through the provider.** Wrap the app in `AsteriskProvider` with your analytics function; give important controls an `analyticsId` (`area.action`). Never put what people type or see (amounts, IBANs, names, codes) in `analyticsData`.
8. **Start from a block.** For a whole screen, copy a block (`npx @areebadigital/asterisk-cli add mobile-send-money`) and replace its sample data; blocks add no styles beyond the `ar-screen-*` and `ar-app-*` layout classes.

## Check your work

- `npx stylelint` and `npx eslint` with `@areebadigital/asterisk-lint` catch raw colours, left/right CSS, raw motion values and native controls.
- Switch the page to `dir="rtl" lang="ar"` and dark mode before you finish.
