# Changesets

Every pull request that changes what product teams get adds a changeset: run `npm run changeset`, pick the bump (patch: a fix; minor: something new; major: something that breaks), and write one sentence for the changelog. The four Asterisk packages share one version. On `main`, the Release workflow opens a "Version packages" pull request; merging it publishes to GitHub Packages (npm and Maven).
