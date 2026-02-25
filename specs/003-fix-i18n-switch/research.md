# Research: Fix i18n switch not applying language

## Decision
Initialize i18n after DOM is ready and bind the language toggle once.

## Rationale
The switch can fail if the handler attaches before `#langToggle` exists or if init runs before the DOM is ready.

## Alternatives Considered
- Defer init with a timeout. Rejected because it is nondeterministic.
- Move the script tag to the end of the body. Rejected because the module is already imported by main.js.
