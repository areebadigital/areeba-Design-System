# CodeInput

Enter a one-time code from an SMS or email.

- One real input drawn as boxes, so paste, SMS autofill (`autocomplete="one-time-code"`) and screen readers work. Digits only, always 0–9 and left-to-right.
- `length` is usually 6. `onComplete(code)` fires when every box is filled: verify straight away, no extra tap needed.
- `hint` says where the code went and when it expires; `error` replaces it and is announced. Keep the code typed so people can fix one digit.
- Offer "Send a new code" after the timer, never before.

From the areeba pay app, restyled to the system tokens.
