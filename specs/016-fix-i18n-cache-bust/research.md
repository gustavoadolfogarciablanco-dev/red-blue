# Research

## Observation
`/js/*` assets are cached with `immutable`, so module imports can stay stale across deploys.

## Decision
Add a version token to the i18n module import and bump the main bundle version.
