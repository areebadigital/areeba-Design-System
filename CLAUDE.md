# areeba design system

Source of truth for areeba's design language (mobile apps + SaaS). Published live at https://claude.ai/artifact/XvWoiWjkXwRi4FxLZeE15T (Design System artifact).

- `tokens.json` is the only place values live. After changing it run `python3 scripts/build-tokens.py` to regenerate `tokens.css`.
- `components/bundle.js` (React 18, plain JS, `window.Areeba`), `components/bundle.css` (reads only CSS variables), `components/index.d.ts` (types).
- Each component has `components/<Name>/README.md` (guidelines) and `preview.html` (line 1 is a `@dsCard` marker the artifact reads).
- `components/Cover/preview.html` is the artifact's cover, not a component.
- Every change here should also be published to the artifact above so both stay in sync.
- Colours must keep text at 4.5:1 in light and dark; chart-1..4 stay in fixed order.
