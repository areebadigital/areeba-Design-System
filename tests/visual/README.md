# Screenshot tests

Every Storybook story is rendered in **light**, **dark** and **right-to-left** (Arabic copy, `dir="rtl"`), and each run checks four things:

1. The screenshot matches its reference in `__screenshots__/` (`<story-id>--<light|dark|rtl>.png`).
2. No page or console errors.
3. No axe accessibility violations.
4. No horizontal overflow, and in RTL no English left on screen (Arabic copy comes from `stories/i18n.js`).

Stories come from the built Storybook, so a new story is tested automatically. Its reference screenshot is missing until you create it (below), and the run fails until then. The clock is fixed to 17 Nov 2026 so calendars render the same every day.

## In CI

The **Screenshot tests** workflow runs on every pull request and on `main`. When it fails, download the `screenshot-report` artifact: `playwright-report/index.html` shows each failing story with the reference, the new screenshot and a diff.

- **The change is a regression:** fix the code.
- **The change is intended** (or a story is new): add the label **`update-screenshots`** to the pull request. The workflow regenerates the references and commits them to the PR branch, then removes the label. You can also open Actions → Screenshot tests → Run workflow, choose the branch and tick **Update the reference screenshots**. Check the new images in the PR's file diff. GitHub holds checks on the workflow's own commit for approval ("action_required"), so approve that run in the Actions tab or push your next commit to run the comparison.

References are made in CI, in the `mcr.microsoft.com/playwright:v1.63.0-noble` container, because fonts and anti-aliasing differ between machines. Keep the image tag and `@playwright/test` in `package.json` on the same version.

## On your machine

```bash
npm run build-storybook
```

```bash
npm run test:visual
```

Screenshots taken outside the CI container can differ by a few pixels of anti-aliasing, so treat local failures as a hint and don't commit locally made references. The error, accessibility, overflow and RTL checks are exact everywhere.
