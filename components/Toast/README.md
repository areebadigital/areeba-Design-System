# Toast

A short, temporary confirmation after an action, shown on a `night` surface.

- One line, past tense: "Card frozen", "Transfer sent". Optional single `action` such as Undo.
- Mobile: bottom-centre above the TabBar. SaaS: bottom-left, stacked, max three.
- Auto-dismiss after 4s (6s with an action); pause on hover and focus.
- Never for errors that need a fix; use Alert or inline field errors instead.
- The consumer owns the queue and timing.
