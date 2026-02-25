# Research

## Observation
The loader appears before JS is guaranteed to run, so i18n cannot be relied on for the initial label.

## Decision
Use static text in HTML for the loader label and aria.
