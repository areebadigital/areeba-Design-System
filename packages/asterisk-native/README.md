# @areebadigital/asterisk-native

areeba Asterisk 4 components for React Native apps. Same names, props, tokens and analytics events as `@areebadigital/asterisk-react`, with React Native conventions (`onPress`, `onChangeText`, `testID`).

```bash
npm install @areebadigital/asterisk-native react-native-svg
```

```jsx
import { AsteriskProvider, Button, AmountInput } from '@areebadigital/asterisk-native';

<AsteriskProvider theme="system" locale="ar" analytics={(e) => segment.track(e.name, e)} screen="topup">
  <Button analyticsId="topup.continue" onPress={next}>متابعة</Button>
</AsteriskProvider>
```

- Fonts: add Plus Jakarta Sans, IBM Plex Sans Arabic and IBM Plex Mono to the app (`react-native.config.js` assets), named as in the tokens (`PlusJakartaSans-Regular`…).
- Arabic: call `I18nManager.forceRTL(true)` and restart, as React Native requires; `locale="ar"` switches fonts. Amounts, IBANs and card numbers stay left to right (`ltr()`).
- Reduced motion follows the system setting; every animation uses the motion tokens.
- `analyticsId` also sets `testID` and `nativeID`, so UI tests and analytics SDKs find the element. Events never carry what people type or see.

Components: Button, IconButton, QuickAction(s), TextField, TextArea, SearchField, FilterChip, AmountInput, NumberPad, PasscodeDots, Balance, Switch, Checkbox, RadioGroup, Badge, Alert, Toast, Result, EmptyState, ListItem, List, SettingsList, SettingsRow, DetailList, AppHeader, TabBar, ActionBar, Sheet, Avatar, PaymentCard, PageDots, CodeInput.
