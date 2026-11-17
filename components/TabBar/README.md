# TabBar

The mobile app's bottom navigation between 3–5 top-level destinations.

- Always icon + label; the current item uses `brand` and `aria-current="page"`.
- Height is `size-tabbar` (64px) plus the device's bottom safe-area inset, which the consumer adds as padding.
- From `bp-md` up, render the same destinations as a side rail; on SaaS use the `night` sidebar.
- The consumer owns routing: pass `value` and handle `onChange`.
