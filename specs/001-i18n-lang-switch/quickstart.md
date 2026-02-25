# Quickstart: Adding / Modifying Translations

**Feature**: 001-i18n-lang-switch
**Date**: 2026-02-24

---

## How to Add a New Translatable String

### Step 1 — Add `data-i18n` attribute to the HTML element

Open `index.html` and add the `data-i18n` attribute with the desired key to the element:

```html
<!-- Before -->
<p class="some-class">Mi texto en español</p>

<!-- After -->
<p class="some-class" data-i18n="section.myNewKey">Mi texto en español</p>
```

For inputs/textareas (placeholder text):

```html
<input data-i18n-placeholder="contact.name.placeholder" placeholder="Tu nombre" />
```

For elements with `aria-label`:

```html
<button data-i18n-aria="nav.langToggle.aria" aria-label="Switch to English"></button>
```

### Step 2 — Add the key to both dictionaries in `js/i18n.js`

Open `js/i18n.js` and add the new key to BOTH language objects:

```js
const translations = {
  es: {
    // ... existing keys ...
    'section.myNewKey': 'Mi texto en español',
  },
  en: {
    // ... existing keys ...
    'section.myNewKey': 'My text in English',
  }
}
```

### Step 3 — Verify

Open the site in the browser, switch languages, and confirm the new string appears correctly in both ES and EN.

---

## How to Use a Translation Key in JavaScript

If you need a translated string inside JavaScript (e.g., form validation, dynamic messages):

```js
import { t } from './i18n.js';

// Show translated error message
errorSpan.textContent = t('contact.error.nameRequired');
```

---

## Language Detection Priority (reference)

On page load, the active language is resolved in this order:

1. **Stored preference**: `localStorage.getItem('lang')` → `'es'` or `'en'`
2. **Browser language**: `navigator.language.slice(0, 2)` → matched against `'es'` or `'en'`
3. **Default**: `'es'`

---

## Validation Checklist Before Committing Translations

- [ ] New key added to BOTH `translations.es` and `translations.en`
- [ ] Key follows dot-notation convention: `section.subsection.field`
- [ ] HTML element has `data-i18n="key"` (or `data-i18n-placeholder`, `data-i18n-aria`)
- [ ] Text visually verified in both languages (switch manually)
- [ ] No untranslated strings visible after switching to EN
- [ ] Brand names not translated (HTML5, Node.js, Vercel, WhatsApp, etc.)
