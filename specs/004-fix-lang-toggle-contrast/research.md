# Research: Lang toggle contrast in dark theme

## Decision
Add explicit dark theme styles for .lang-btn to guarantee contrast.

## Rationale
The default token colors are too low contrast on dark backgrounds.

## Alternatives Considered
- Increase font weight only. Rejected because contrast still fails.
- Add a background only on hover. Rejected because default state remains faint.
