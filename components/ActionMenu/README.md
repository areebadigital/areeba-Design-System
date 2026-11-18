# ActionMenu

A button that opens a short list of actions: the card "More" menu, row overflow menus.

- WAI-ARIA menu button: Enter, Space or Down opens on the first item, Up on the last; arrows move, Home/End jump, a letter jumps to the next item starting with it; Enter chooses; Escape closes and returns focus to the button.
- Items: `{ label, icon, onSelect, disabled, danger }`. Put the danger action (Report stolen) last, in `danger`; disabled items stay visible so people learn they exist.
- 3–7 items. For choosing a value use Select; for navigation use a SettingsList.
- The default trigger is an IconButton with the "more" icon; pass `button` to use another trigger (it receives the ref and ARIA props).

From the areeba pay app, restyled to the system tokens.
