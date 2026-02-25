# Implementation Plan: Fix language toggle contrast in dark theme

**Branch**: `004-fix-lang-toggle-contrast` | **Date**: 2026-02-24 | **Spec**: [spec.md](./spec.md)

## Summary
Ensure the language toggle label remains readable in dark theme without regressing light theme.

## Technical Context
- CSS variables for theme tokens
- Toggle element: `.lang-btn` in the nav

## Plan
1. Review `.lang-btn` styles in `css/main.css` for light/dark tokens.
2. Add explicit foreground and background colors for dark theme.
3. Ensure hover/focus states remain readable and consistent.

## Validation
- Dark theme: label is readable at rest and on hover.
- Light theme: no visual regression.
- Contrast target: 4.5:1 or better in dark theme.
