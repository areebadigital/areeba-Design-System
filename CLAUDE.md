# areeba design system

Source of truth for areeba's design language (mobile apps + SaaS). Published live at https://claude.ai/artifact/XvWoiWjkXwRi4FxLZeE15T (Design System artifact).

- `tokens.json` is the only place values live. After changing it run `python3 scripts/build-tokens.py` to regenerate `tokens.css`.
- `components/bundle.js` (React 18, plain JS, `window.Areeba`), `components/bundle.css` (reads only CSS variables), `components/index.d.ts` (types).
- Each component has `components/<Name>/README.md` (guidelines) and `preview.html` (line 1 is a `@dsCard` marker the artifact reads).
- `components/Cover/preview.html` is the artifact's cover, not a component.
- Every change here should also be published to the artifact above so both stay in sync.
- Figma library: areeba Design System 4.0, https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ (variables mirror `tokens.json`; components mirror `bundle.js`). Keep it in step when tokens or components change.
- `figma/*.figma.ts` are Code Connect templates (parserless `figma.code`, one per component and exported icon). Update a template when its component's Figma properties or code props change. Publishing needs an Organization/Enterprise Figma plan.
- Colours must keep text at 4.5:1 in light and dark; chart-1..4 stay in fixed order.
- Arabic is first-class: every component must work with `dir="rtl"`. Use logical CSS (start/end, `inset-inline`, `margin-inline`), never left/right; keep amounts, IBANs and card numbers left-to-right (isolate with `dir="ltr"` or `ltr()`); give built-in words an Arabic entry in `UI_TEXT`. In Storybook's RTL mode stories show Arabic: add every new story string to `stories/i18n.js`, and check the story with the Direction switch.
- Never use native browser controls (no native `<select>`, date inputs or pickers): draw every control in `bundle.js` and follow its WAI-ARIA pattern. Text entry keeps a real `<input>`, the only exception. Form values from custom controls travel in `<input type="hidden">`.
- Actions and selection use `brand` (Crimson Deep). Signal Red (`accent`) is only the logo and large headline highlights, never buttons or status: in money products bright red reads as an error.
- Screenshot tests (`tests/visual/`, `npm run test:visual` after `npm run build-storybook`) cover every story in light, dark and RTL, plus axe, errors, overflow and English left in RTL. References are generated only in CI (label a PR `update-screenshots`, or run the "Screenshot tests" workflow by hand with "Update the reference screenshots"), never committed from a local machine. Keep the workflow's Playwright image tag and `@playwright/test` on the same version.
- Blocks (`blocks/`) are copyable whole screens in JSX built only from `window.Areeba` components and tokens, with an English and Arabic `COPY` object picked from `<html lang>`. Each has a story in `stories/blocks/` that shows its own file as the source. A block never adds styles of its own beyond the `ar-screen` layout classes; if it needs something new, build it as a component first.
- Storybook (`stories/`, `npm run storybook`) documents everything. When you add or change a component, token family or asset, update its story or foundation page too; component docs come from each `README.md`, so keep those current.
