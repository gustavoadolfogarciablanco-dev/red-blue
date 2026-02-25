# Implement: Fix i18n switch not applying language

## Goal
Make the language toggle apply translations and metadata updates on click.

## Steps
1. Inspect `#langToggle` in the DOM and confirm it exists on load.
2. Validate `initI18n()` runs at the right time and binds the click handler.
3. Verify `applyLanguage()` updates all text nodes and metadata.
4. Test EN -> ES -> EN without reload.
5. Verify persistence via `localStorage` after refresh.
