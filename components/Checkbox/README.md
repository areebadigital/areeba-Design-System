# Checkbox

Lets people pick any number of options, or confirm a single statement, with changes applied on Save.

- Use for multi-select lists, table row selection and consent ("I agree to the terms"). For a setting that applies the moment you tap it, use Switch.
- `indeterminate` marks a parent whose children are partly selected (table "select all").
- Label is clickable and says what checking means. Add `hint` for consequences.
- Matches the Figma Checkbox: 16px box, `radius-xs`, 8px gap, 14/20 medium label. Checked uses `brand` (Crimson Deep). The border is `line-strong` (3:1) rather than Figma's `#EBEBEB`, which is only 1.2:1 against white. Keep a 44px tap row on mobile.
- No native input: it is a button with `role="checkbox"` and `aria-checked` (`mixed` when indeterminate), following the WAI-ARIA checkbox pattern. Space toggles it. `onChange(checked)` receives the new state; pass `name` (and optionally `value`) to submit it in a form.
