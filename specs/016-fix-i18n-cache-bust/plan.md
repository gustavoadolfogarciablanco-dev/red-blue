# Implementation Plan: Fix i18n module cache bust

**Branch**: `016-fix-i18n-cache-bust` | **Date**: 2026-02-25 | **Spec**: [spec.md](./spec.md)

## Summary
Force the browser to fetch the latest `i18n.js` by adding a version token to the module import, and bump the main JS version token.

## Technical Context
- `js/main.js` imports `./i18n.js` as an ES module.
- `vercel.json` sets immutable caching for `/js/*` assets.

## Plan
1. Add a version token to the i18n module import in main.js.
2. Bump the main.js version token in index.html.
3. Deploy and verify the loader text.

## Validation
- DevTools Network shows `js/i18n.js?v=...`.
- Loader label shows translated text, not the key.
