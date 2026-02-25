# Implementation Plan: Tech stack section refresh + filters

**Branch**: `009-tech-stack-refresh` | **Date**: 2026-02-25 | **Spec**: [spec.md](./spec.md)

## Summary
Redesign the Tecnologias section with a professional header, filter chips, a richer card grid, a result count, and full i18n.

## Technical Context
- Section markup in [index.html](../../index.html)
- Styles in [css/main.css](../../css/main.css)
- i18n strings in [js/i18n.js](../../js/i18n.js)
- Filter logic in [js/main.js](../../js/main.js)

## Plan
1. Replace the Tecnologias section markup with the new layout structure.
2. Add filter buttons with category keys and accessible attributes, aligned to services.
3. Add flip cards with official icons centered and titles below, including JS, Nuxt, Rust, Nest, Splunk, and Amplitude.
4. Add a result count that updates with filters.
5. Add i18n keys for heading, intro, filters, count, and expanded descriptions (ES/EN).
6. Add CSS for flip animation, equal card heights, and alternating red/blue accents, preserving responsiveness.
7. Apply red/blue icon coloring instead of brand colors.
8. Hide icon containers when logos fail to load.
9. Update section headings and subtitles to use full width on small screens.
10. Remove service card icon containers.
11. Add JS for filter interactions, active state, result count, tap-to-flip on touch devices, icon color alternation, and icon load fallback.

## Validation
- Filters show/hide cards correctly and update the count.
- All new text switches with language toggle.
- Layout remains responsive at 1024px/768px/480px.
