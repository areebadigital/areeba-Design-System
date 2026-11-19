# @areebadigital/asterisk-cli

Copy areeba Asterisk 4 blocks (whole mobile screens and SaaS pages, English and Arabic) into your app.

```bash
npx @areebadigital/asterisk-cli list
npx @areebadigital/asterisk-cli add mobile-send-money --dir src/screens
npx @areebadigital/asterisk-cli init
```

`add` rewrites the block to import from `@areebadigital/asterisk-react`; pass `--global` to keep `window.Areeba`, and `--force` to overwrite. The block is yours after copying: edit the copy text, keep the components.
