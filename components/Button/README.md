# Button

Buttons trigger actions; use exactly one `primary` per screen for the thing the screen is for.

- **primary** (`brand`): the main action. "Pay $42.00", "Continue".
- **secondary**: alternatives next to a primary. Border is `line-strong`.
- **ghost**: low-emphasis actions in toolbars, dialogs' "Cancel".
- **danger** (`danger`): destructive confirmations only, inside a confirm dialog or settings.

Sizes: `lg` (48px) is the mobile default, `md` (40px) the SaaS default, `sm` (32px) only in dense SaaS tables. On mobile, pin the primary action full-width (`block`) above the safe area.

Labels: verb first, sentence case, name the outcome. Include the amount on payment confirmations. The consumer provides the label and the `onClick`.
