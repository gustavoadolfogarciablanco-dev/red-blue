# Research

## Observation
Initial loads show a flash of untranslated content and stale HTML on iOS Safari.

## Decision
Introduce a loader gate and enforce no-store HTML headers while keeping asset caching.
