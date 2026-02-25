# Implement: Multi-Language Support (ES / EN)

## Goal
Enable ES/EN language support with automatic detection, manual toggle, and dynamic SEO updates.

## Steps
1. Add `js/i18n.js` with dictionaries, `initI18n`, `applyLanguage`, `t`, and `getCurrentLang`.
2. Add `data-i18n*` attributes across all sections in `index.html`.
3. Add the language toggle button in the nav and wire it in `initI18n()`.
4. Update `document.title`, meta description, and `<html lang>` on language switch.
5. Validate ES/EN coverage and persistence in `localStorage`.
