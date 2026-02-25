# Implementation Plan: Loading gate + hard HTML cache reset

**Branch**: `013-loading-cache-reset` | **Date**: 2026-02-25 | **Spec**: [spec.md](./spec.md)

## Summary
Add a loading overlay that waits for i18n and the load event, plus enforce a no-store policy for the root HTML and bump asset version tokens.

## Technical Context
- Headers are defined in [vercel.json](../../vercel.json).
- Asset URLs are in [index.html](../../index.html).
- i18n is initialized in [js/i18n.js](../../js/i18n.js).
- Page boot logic lives in [js/main.js](../../js/main.js).

## Plan
1. Add loader markup in index.html and loader styles in main.css.
2. Add a loading gate in main.js that clears after i18n + window load (or timeout).
3. Add no-store headers for `/` and `/index.html` in vercel.json.
4. Bump CSS/JS version tokens in index.html.

## Validation
- The loader appears briefly on a cold load, then fades out.
- No-store headers apply to the root document.
- CSS/JS headers remain unchanged.
