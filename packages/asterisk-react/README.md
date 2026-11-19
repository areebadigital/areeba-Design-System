# @areebadigital/asterisk-react

areeba Asterisk 4 components for web apps and SaaS portals: 47 components drawn without native browser controls, right-to-left and Arabic ready, WAI-ARIA keyboard patterns, motion from tokens and standard analytics events.

```bash
npm install @areebadigital/asterisk-react
```

```jsx
import '@areebadigital/asterisk-react/styles.css';
import { AsteriskProvider, Button, TextField } from '@areebadigital/asterisk-react';

<html lang="ar" dir="rtl">…
<AsteriskProvider analytics={(e) => segment.track(e.name, e)} screen="topup">
  <TextField label="IBAN" dir="ltr" analyticsId="topup.iban" />
  <Button analyticsId="topup.continue">Continue</Button>
</AsteriskProvider>
```

- Dark theme: set `data-theme="dark"` on `<html>` (or leave it to `prefers-color-scheme`).
- No bundler: load React 18, then `@areebadigital/asterisk-react/global` (sets `window.Areeba`).
- `components.json` lists every component with its props, rules and docs link, for tools and coding agents; `AGENTS.md` and `llms.txt` say how to use the system.
- Docs and live examples: [Storybook](https://areebadigital.github.io/areeba-Design-System/).
