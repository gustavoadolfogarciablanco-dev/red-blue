# Contract: i18n Module Public API

**Module**: `js/i18n.js`
**Feature**: 001-i18n-lang-switch
**Date**: 2026-02-24

---

## Overview

`js/i18n.js` is the single source of truth for all language-related behavior. It exports a set of functions consumed by `js/main.js` and potentially by inline scripts. It does NOT directly manipulate the DOM outside of the `applyLanguage()` function — all DOM targeting is driven by `data-i18n-*` attributes on HTML elements.

---

## Exported Interface

### `initI18n()`

Initializes the i18n system on page load. Must be called once, before any content is displayed.

```
initI18n() → void
```

**Behavior**:
1. Determines the initial language using the priority resolution:
   a. `localStorage.getItem('lang')` if valid
   b. `navigator.language` prefix match
   c. Default `'es'`
2. Calls `applyLanguage(lang)` with the resolved language
3. Renders the language selector button in the navigation

**Side effects**: Updates DOM, sets `<html lang>`, updates `document.title` and meta description.

---

### `applyLanguage(langCode)`

Applies a language to the entire page. Intended to be called both on init and on user-triggered switches.

```
applyLanguage(langCode: 'es' | 'en') → void
```

**Behavior**:
1. Sets `currentLang = langCode`
2. Persists: `localStorage.setItem('lang', langCode)`
3. Updates `document.documentElement.setAttribute('lang', langCode)`
4. Updates `document.title` from `translations[langCode]['seo.title']`
5. Updates `meta[name="description"]` content from `translations[langCode]['seo.description']`
6. Iterates all `[data-i18n]` → sets `textContent`
7. Iterates all `[data-i18n-placeholder]` → sets `placeholder`
8. Iterates all `[data-i18n-aria]` → sets `aria-label`
9. Iterates all `[data-i18n-html]` → sets `innerHTML`
10. Updates selector button label to show the OTHER language code

**Performance**: All DOM updates complete synchronously within a single call. No async operations. Expected to complete well under 300ms (SC-002).

---

### `t(key)`

Looks up a translation string for the currently active language.

```
t(key: string) → string
```

**Parameters**:
- `key` — dot-notation translation key (e.g., `'hero.tag'`, `'contact.submit'`)

**Returns**: The translated string, or the key itself as fallback if not found (to prevent silent failures).

**Usage**: Primarily used in JS-generated content (form validation messages, dynamic status messages). Static HTML content uses `data-i18n` attributes instead.

---

### `getCurrentLang()`

Returns the currently active language code.

```
getCurrentLang() → 'es' | 'en'
```

---

## Translation Dictionary Shape

The `translations` object follows this structure. Both `es` and `en` MUST have identical keys.

```js
const translations = {
  es: {
    'seo.title': '...',
    'seo.description': '...',
    'nav.cta': '...',
    // ... all keys from data-model.md
  },
  en: {
    'seo.title': '...',
    // ... all keys must match es
  }
}
```

**Invariant**: `Object.keys(translations.es)` must equal `Object.keys(translations.en)`. Missing keys return the key string as fallback.

---

## Integration Points

| Consumer         | How it uses i18n                                              |
|------------------|---------------------------------------------------------------|
| `js/main.js`     | Calls `initI18n()` on DOMContentLoaded, before GSAP init     |
| `index.html`     | Provides `data-i18n-*` attributes; i18n module reads them    |
| Form validation  | Uses `t('contact.error.nameRequired')` etc. for error messages |
| Lang selector btn| Created by `initI18n()`, triggers `applyLanguage()` on click  |

---

## Constraints

- The module MUST NOT import any external library.
- The module MUST be side-effect-free until `initI18n()` is explicitly called.
- `applyLanguage()` MUST NOT cause a page reload.
- Translation keys added to HTML `data-i18n` attributes with no corresponding dictionary entry MUST NOT throw — they silently return the key string.
