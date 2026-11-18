# AppHeader

The top bar of an app screen: a start action, the screen title, end actions.

- The title is the page's `h1`, centred, one line. `subtitle` adds context under it ("To •••• 1395").
- Start: back or the profile avatar. End: notifications, download, a "more" ActionMenu, or close in sheets. Use IconButtons with labels.
- `variant="modal"` adds a drag handle and a divider for bottom sheets and flow steps; `transparent` for screens over imagery.
- The back arrow flips in right-to-left, and start/end swap sides.

From the areeba pay app, restyled to the system tokens.
