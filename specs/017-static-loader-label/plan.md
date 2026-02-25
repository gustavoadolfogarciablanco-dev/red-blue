# Implementation Plan: Static loader label fallback

**Branch**: `017-static-loader-label` | **Date**: 2026-02-25 | **Spec**: [spec.md](./spec.md)

## Summary
Remove i18n bindings from the loader label and aria so it always shows a human string.

## Technical Context
- Loader markup lives in [index.html](../../index.html).

## Plan
1. Remove `data-i18n` and `data-i18n-aria` from the loader markup.
2. Keep the static Spanish label and aria text.

## Validation
- The loader shows "Cargando" and never a raw key.
