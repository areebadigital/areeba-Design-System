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
- Never use native browser controls (no native `<select>`, date inputs or pickers): draw every control in `bundle.js` and follow its WAI-ARIA pattern. Text entry keeps a real `<input>`, the only exception. Form values from custom controls travel in `<input type="hidden">`.
- Actions and selection use `brand` (Crimson Deep). Signal Red (`accent`) is only the logo and large headline highlights, never buttons or status: in money products bright red reads as an error.
- Storybook (`stories/`, `npm run storybook`) documents everything. When you add or change a component, token family or asset, update its story or foundation page too; component docs come from each `README.md`, so keep those current.
