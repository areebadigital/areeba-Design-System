# @areebadigital/asterisk-tokens

areeba Asterisk 4 design tokens: colours (light and dark), type, space, radius, shadows and motion. Generated from `tokens.json` in [areeba-Design-System](https://github.com/areebadigital/areeba-Design-System); never edit the files here.

```bash
npm install @areebadigital/asterisk-tokens
```

| Import | For |
| --- | --- |
| `@areebadigital/asterisk-tokens/tokens.css` | CSS variables (`var(--brand)`), dark theme with `[data-theme="dark"]`, reduced motion, fonts |
| `@areebadigital/asterisk-tokens` | The same values as JavaScript (`tokens.color.light.brand`) |
| `@areebadigital/asterisk-tokens/native` | React Native: `light` and `dark` themes in numbers and font names |
| `@areebadigital/asterisk-tokens/tokens.json` | The raw values, for other tools |

Kotlin (card machines): `com.areeba.asterisk:asterisk-tokens` from the same GitHub Packages registry, object `AsteriskTokens`.

Keep text at 4.5:1 in light and dark, use `brand` for actions and selection, and keep `accent` (Signal Red) for the logo and large headlines only.
