# Implementation Plan: Loader fallback with i18n upgrade

**Branch**: `018-loader-fallback-then-i18n` | **Date**: 2026-02-25 | **Spec**: [spec.md](./spec.md)

## Summary
Re-enable i18n bindings on the loader while keeping the static fallback text.

## Technical Context
- Loader markup is in [index.html](../../index.html).
- i18n fallback behavior is in [js/i18n.js](../../js/i18n.js).

## Plan
1. Add `data-i18n` and `data-i18n-aria` back to loader markup.
2. Keep the static label as fallback.
3. Deploy and verify.

## Validation
- Loader shows fallback immediately.
- Loader updates when i18n is available.
