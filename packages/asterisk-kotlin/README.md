# areeba Asterisk 4 for Kotlin

Tokens and Jetpack Compose components for areeba's **card machines** (Android payment terminals with a touch screen, some with a second, customer-facing display) and Android apps.

| Artifact | What |
| --- | --- |
| `com.areeba.asterisk:asterisk-tokens` | `AsteriskTokens`: colours (light and dark), type, space, radius, sizes, motion. Plain Kotlin, generated from `tokens.json`. |
| `com.areeba.asterisk:asterisk-compose` | Compose components (Kotlin Multiplatform: Android, plus JVM for tests and previews). |

```kotlin
// settings.gradle.kts
dependencyResolutionManagement { repositories {
    google(); mavenCentral()
    maven("https://maven.pkg.github.com/areebadigital/areeba-Design-System") { credentials { username = "…"; password = "…" /* token with read:packages */ } }
} }
// build.gradle.kts
dependencies { implementation("com.areeba.asterisk:asterisk-compose:4.0.0") }
```

## Use

```kotlin
AsteriskTheme(dark = isSystemInDarkTheme(), locale = "ar", fonts = AppFonts, reduceMotion = systemReduceMotion(context),
              analytics = { e -> tracker.log(e.name, e.details) }, screen = "sale") {
    TerminalHeader("Green Grocer", terminalId = "T-0142 7781")
    AmountDisplay(formatAmount(amount), label = "Sale")
    Keypad(onKey = { amount = padInput(amount, it) }, decimal = true)
    Button("Charge", onClick = charge, size = ButtonSize.Lg, block = true, analytics = Analytics("sale.charge"))
}
```

- **Fonts:** bundle Plus Jakarta Sans, IBM Plex Sans Arabic and IBM Plex Mono (`fonts/` in this repo; convert to TTF for `res/font`) and pass them as `AsteriskFonts`.
- **Arabic:** `locale = "ar"` lays out right to left and switches font. Amounts, card numbers, references and terminal ids stay left to right. The keypad keeps 1-2-3 left to right, like every phone and PIN pad.
- **Motion:** token durations only; pass the system setting as `reduceMotion` and every duration becomes 0. Things enter (fade, rise, scale); nothing loops.
- **Touch:** every control is at least 48dp. Keypad keys are 64dp and the main payment action is 56dp (`ButtonSize.Lg`).
- **Analytics:** events are `asterisk.<component>.<action>` with `analyticsId`, screen and safe details. They never carry amounts, card numbers, PIN progress, names or messages.

## Components

| Component | Use it for |
| --- | --- |
| `TerminalHeader` | Merchant, terminal id, online/offline and printer state at the top of merchant screens |
| `AmountDisplay`, `formatAmount` | The amount being entered or due |
| `Keypad`, `padInput` | Amount entry (big keys, `.` or `00`) |
| `Button`, `IconButton` | Actions; one Primary per screen; Danger for void and refund |
| `CardPrompt` | "Tap, insert or swipe" with the amount due |
| `PinDots` | How many PIN digits are in (the PIN itself goes on the secure PIN pad) |
| `PaymentStep` | "Processing…", "Remove card" |
| `PaymentResult` | Approved, declined or pending, with next steps |
| `DetailList` | Receipts and summaries |
| `TransactionRow` | Terminal history |
| `Badge`, `Banner` | Status and system messages (offline, paper out, low battery) |
| `CustomerDisplay`, `CustomerDisplayController` | The customer-facing screen: idle, basket, pay, step, result |
| `CustomerPresentation` (Android) | Shows `CustomerDisplay` on the terminal's second display |

## Dual-screen terminals

The merchant screen and the customer display share one `CustomerDisplayController`. The merchant flow calls `show(...)` at each step; the customer sees one large message at a time, in their own language (`controller.locale`).

```kotlin
val customer = remember { CustomerDisplayController(CustomerScreen.Idle("Green Grocer"), locale = "ar") }
DisposableEffect(Unit) { val p = CustomerPresentation.showIfAvailable(activity, activity, customer, fonts = AppFonts); onDispose { p?.dismiss() } }
customer.show(CustomerScreen.Pay("24.50"))
```

`CustomerPresentation` uses Android's presentation display, which most dual-screen terminals expose. If a terminal drives its customer screen through the vendor's SDK instead, draw `CustomerDisplay` into the view that SDK gives you.

## Develop

```bash
./gradlew :tokens:test :compose:jvmTest   # unit tests, analytics privacy, and screenshots in compose/build/shots
```

The Android target builds when an Android SDK is present (`ANDROID_HOME` or `sdk.dir` in `local.properties`), as in CI. Tokens and icons are generated: `node scripts/build-platform-tokens.mjs` and `node scripts/build-native-icons.mjs` from the repo root.
