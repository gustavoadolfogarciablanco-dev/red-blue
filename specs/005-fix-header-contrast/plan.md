# Implementation Plan: Fix fixed header contrast over hero

**Branch**: `005-fix-header-contrast` | **Date**: 2026-02-24 | **Spec**: [spec.md](./spec.md)

## Summary
Ensure the fixed header has readable contrast over the hero background from the first scroll.

## Technical Context
- Fixed nav with `.nav` and `.nav.scrolled` styles
- Hero background includes gradients and noise

## Plan
1. Review `nav` background and text contrast at scrollY 0-50.
2. Adjust header background/blur or text color to maintain contrast.
3. Ensure behavior works in light and dark themes.
4. Avoid layout shift or flicker on scroll.

## Validation
- Header readable at first scroll and beyond.
- No flicker or layout shift.
- Light and dark theme coverage.
