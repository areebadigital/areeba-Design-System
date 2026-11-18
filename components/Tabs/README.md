# Tabs

A segmented control that switches between views of the same content.

- 2–5 short labels. Use for periods (Day/Week/Month), filters (All/In/Out) and sub-views.
- Not for primary navigation: use TabBar on mobile and the sidebar on SaaS.
- Controlled with `value`/`onChange` or uncontrolled with `defaultValue`. The consumer renders the panel content.
- WAI-ARIA tabs: the list is one tab stop; arrow keys move and select (they follow reading direction, so Left moves forward in Arabic), Home and End jump.
- Give Tabs an `id` and wrap the content in `TabPanel` (`tabs` = that id, `value` = the tab) so each tab is linked to its panel. Render only the current panel.
