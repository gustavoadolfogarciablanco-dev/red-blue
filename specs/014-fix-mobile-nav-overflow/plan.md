# Implementation Plan: Fix mobile nav overflow on Samsung S25 Ultra

**Branch**: `014-fix-mobile-nav-overflow` | **Date**: 2026-02-25 | **Spec**: [spec.md](./spec.md)

## Summary
Adjust the nav layout and button sizing at small breakpoints to prevent horizontal overflow.

## Technical Context
- Nav styles are in [css/main.css](../../css/main.css).
- CTA lives in [index.html](../../index.html).

## Plan
1. Add a mobile breakpoint (<= 520px) to reduce nav gaps and button sizes.
2. Ensure the CTA remains on one line without clipping.
3. Verify no horizontal scroll on 360-420px widths.

## Validation
- Emulate 360-420px widths and confirm no horizontal scrolling.
- Check that the CTA remains fully visible.
