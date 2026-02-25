# Implementation Plan: Fix mobile X scroll and i18n fallback

**Branch**: `015-fix-mobile-x-scroll-and-i18n-fallback` | **Date**: 2026-02-25 | **Spec**: [spec.md](./spec.md)

## Summary
Tighten the mobile nav layout to prevent horizontal overflow and add i18n fallback behavior to avoid raw keys.

## Technical Context
- Nav styles are in [css/main.css](../../css/main.css).
- i18n logic is in [js/i18n.js](../../js/i18n.js).
- Asset URLs are in [index.html](../../index.html).

## Plan
1. Add HTML/body overflow guards and tighter nav styles for <= 420px.
2. Add i18n fallback to keep existing text when a key is missing.
3. Bump CSS/JS version tokens for cache refresh.

## Validation
- Emulate 360-420px widths and confirm no horizontal scroll.
- Confirm loader label shows human text, not raw keys.
