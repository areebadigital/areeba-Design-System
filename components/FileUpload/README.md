# FileUpload

Add files: business documents, an ID, a receipt for a dispute.

- Drag files onto the zone or press "Choose file". The zone and button are drawn by areeba; the browser's file input stays hidden because it is the only way to open the system file picker.
- `accept` (".pdf,.jpg,.png" or "image/*") and `maxSize` (bytes) are checked as files are added; a file that fails stays in the list with the reason, in `danger`, so people know what to replace.
- Say the rules in `hint` before people choose: "PDF, JPG or PNG, up to 10 MB".
- Each file shows its name, size and state: uploading (with progress), uploaded, or the error, and a labelled remove button. Pass `files` to drive the states from your upload code (`status`, `progress`), or let the component keep the list (`defaultFiles`, `onChange`).
- `multiple` accepts several files. File names keep their own direction in Arabic.
