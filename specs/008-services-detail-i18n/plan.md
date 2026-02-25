# Implementation Plan: Services section expansion + i18n

**Branch**: `008-services-detail-i18n` | **Date**: 2026-02-25 | **Spec**: [spec.md](./spec.md)

## Summary
Expand the Services section with richer copy, bullet highlights, CTA links, a more professional heading, and three additional services, with full i18n.

## Technical Context
- Services markup in [index.html](../../index.html)
- Services styles in [css/main.css](../../css/main.css)
- i18n strings in [js/i18n.js](../../js/i18n.js)
- Template reference in [templates/servicios.json](../../templates/servicios.json)

## Plan
1. Update the Services HTML to add a more professional heading, intro paragraph, subtitles, bullet lists, CTAs, and three new service cards.
2. Adjust service icons to match each service.
3. Add i18n keys for all new text in ES and EN.
4. Update CSS for new elements while preserving responsive layout.
5. Set alternating card backgrounds to match the header gray.
6. Remove featured styling so all six cards participate in alternation.
7. Align template JSON with updated content (reference only).

## Validation
- All new content appears in ES and EN.
- CTA links scroll to Contacto.
- Layout remains responsive at 1024px/768px/480px.
- Alternating backgrounds remain visible in light and dark themes.
- No card uses featured styling; alternation is consistent across all six cards.
