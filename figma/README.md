# Code Connect templates

One parserless template (`*.figma.ts`, `figma.code`) per component in the Figma library [areeba Design System 4.0](https://www.figma.com/design/HUoG7rGPlAR8cQAaV4fswZ), plus one per icon exported on `window.Areeba.icons`. The `// url=` line on each file is the Figma component it maps.

- Parents compose their children: `Tabs`, `TabBar`, `Sidebar`, `Select`, `Calendar`, `ActionMenu`, `CardPicker`, `DetailList`, `RadioGroup` and `FileUpload` read their items (`TabsTab`, `TabBarItem`, `SidebarItem`, `SelectOption`, `CalendarDay`, `ActionMenuItem`, `CardPickerOption`, `DetailListRow`, `Radio`, `FileUploadFile`) through `metadata.props`, and `List`, `Dialog`, `EmptyState`, `ListItem`, `ActionBar`, `SettingsList` and `Result` render the nested `ListItem`, `Button`, `Badge` and `SettingsRow` templates.
- Components whose `icon` prop takes a name (`IconButton`, `QuickAction`, `ActionMenu` items, `SettingsRow`) read it from the swapped icon's template (`metadata.props.name`).
- Icons drawn inside components only (calendar, tick, dash, contactless) are not exported, so they have no template.
- Property names must match the Figma component exactly (case-sensitive). Every VARIANT value is mapped.

Publishing needs a Figma Organization or Enterprise plan. Run it from the repo root:

```bash
FIGMA_ACCESS_TOKEN=<token> npx @figma/code-connect connect publish
```
