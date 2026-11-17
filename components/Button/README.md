# Button

Buttons trigger actions; use exactly one `primary` per screen for the thing the screen is for.

- **primary** (`brand`, Crimson Deep with white text): the main action. "Pay $42.00", "Continue". Never Signal Red: in a money product bright red reads as an error.
- **secondary** (`brand-soft` fill, `brand` text, as in Figma): alternatives next to a primary.
- **ghost**: low-emphasis actions in toolbars, dialogs' "Cancel".
- **danger** (`danger`): destructive confirmations only, inside a confirm dialog or settings. It is a brighter red than the brand so the two never blur.

Matches Figma's button: 16/24 semibold, 20px side padding, `radius-xs`. Sizes: `lg` (48px) is the mobile default, `md` (44px, Figma) the SaaS and web default, `sm` (32px) only in dense SaaS tables. On mobile, pin the primary action full-width (`block`) above the safe area.

Labels: verb first, sentence case, name the outcome. Include the amount on payment confirmations. The consumer provides the label and the `onClick`.
