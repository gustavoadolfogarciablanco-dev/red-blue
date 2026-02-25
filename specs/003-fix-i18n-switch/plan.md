# Implementation Plan: Fix i18n switch not applying language

**Branch**: `003-fix-i18n-switch` | **Date**: 2026-02-24 | **Spec**: [spec.md](./spec.md)

## Summary
Fix the language toggle so clicking EN or ES updates all visible content and metadata. Ensure the toggle is wired, the i18n module initializes at the right time, and the DOM update selectors cover all translated nodes.

## Technical Context
- HTML + CSS + JS (ES modules)
- `js/i18n.js` provides `initI18n()` and `applyLanguage()`
- `js/main.js` imports `initI18n()`

## Plan
1. Verify `#langToggle` exists before the click handler is attached.
2. Ensure `initI18n()` runs after DOM is ready or handles missing elements safely.
3. Confirm `applyLanguage()` updates:
   - `[data-i18n]`
   - `[data-i18n-html]`
   - `[data-i18n-placeholder]`
   - `[data-i18n-aria]`
   - `document.title`, `meta[name="description"]`, and `<html lang>`
4. Ensure the toggle label updates after each switch.

## Validation
- Click EN -> all text switches to English within 300ms.
- Click ES -> all text switches back to Spanish within 300ms.
- Title, meta description, and html lang update after each switch.
- Language choice persists after reload.
