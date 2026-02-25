# Research: Multi-Language Support (ES / EN)

**Feature**: 001-i18n-lang-switch
**Date**: 2026-02-24
**Status**: Complete — all NEEDS CLARIFICATION resolved

---

## Decision 1: i18n Strategy — Client-Side Dictionary Objects

**Decision**: Use a dedicated `js/i18n.js` module that exports translation dictionaries as plain JavaScript objects, keyed by language code (`es`, `en`).

**Rationale**: The project is a static single-page landing with no build system or server-side rendering. A lightweight dictionary approach adds zero dependencies, performs instantaneously, and aligns with the project's "no unnecessary libraries" principle from the constitution. External i18n libraries (i18next, Polyglot, etc.) are overkill for ~55 strings across 2 languages.

**Alternatives considered**:
- External i18n library (i18next): Adds ~30KB dependency, unnecessary for this scope.
- JSON files fetched via `fetch()`: Requires async loading, adds complexity and a network round-trip. Not justified for a static page.
- Separate HTML files per language (`/en/index.html`): Breaks the single-URL requirement from spec FR-012 and duplicates HTML maintenance.

---

## Decision 2: DOM Binding — `data-i18n` Attribute Pattern

**Decision**: Mark every translatable DOM node with a `data-i18n="key"` attribute. The i18n module iterates all `[data-i18n]` elements on language switch and updates their content via the translation dictionary.

**Rationale**: Decouples translation keys from JavaScript logic. Adding a new string requires only adding `data-i18n="key"` to the HTML and the corresponding entry in the dictionary — no JS changes needed. This pattern is widely used in vanilla i18n implementations and is easy to maintain.

**Special attributes for non-text content**:
- `data-i18n-placeholder="key"` → updates `element.placeholder`
- `data-i18n-aria="key"` → updates `aria-label`

**Alternatives considered**:
- `id`-based selection in JS: Requires updating JS code every time a new string is added. Fragile.
- Template literal replacement: Requires re-rendering entire sections, breaks event listeners.

---

## Decision 3: Language Persistence — `localStorage`

**Decision**: Store the user's language choice as `localStorage.setItem('lang', 'es' | 'en')`. On page load, read this value first; fall back to browser detection, then to `'es'`.

**Rationale**: `localStorage` is synchronous, universally supported, and persists indefinitely across sessions on the same browser. Matches spec FR-006 (persist across visits) and the project's constitution principle of "backend mínimo y seguro" (no server-side session needed).

**Priority order on load**:
1. `localStorage.getItem('lang')` — user's explicit previous choice
2. `navigator.language` prefix match (`en` or `es`) — browser preference
3. Default: `'es'` — fallback as specified

**Alternatives considered**:
- `sessionStorage`: Does not persist across visits (fails FR-006).
- Cookie: More complex, requires GDPR consideration, overkill for a UI preference.
- URL parameter (`?lang=en`): Breaks single-URL requirement (FR-012).

---

## Decision 4: Language Selector — Toggle Button in Navigation

**Decision**: Add a compact toggle button to `.nav__right` showing the current language code (`ES` / `EN`). A single click switches to the other language. The button uses `aria-label` that updates with the language switch context.

**Rationale**: A two-option toggle is the simplest and most space-efficient solution for exactly 2 languages. Fits naturally alongside the existing theme-toggle button in `.nav__right`. Avoids dropdown complexity.

**Alternatives considered**:
- Dropdown select: Unnecessary for 2 options; worse accessibility than a button.
- Two separate buttons (ES | EN) with active state: Slightly more visual weight; marginally better discoverability. Deferred to implementation preference.

---

## Decision 5: SEO Metadata Update

**Decision**: On every language switch, update:
1. `document.title` — from the active language's `seo.title` translation key
2. `document.querySelector('meta[name="description"]').setAttribute('content', ...)` — from `seo.description`
3. `document.documentElement.setAttribute('lang', langCode)` — declared page language

**Rationale**: These are the minimal SEO signals required by spec FR-009, FR-010, FR-011. `og:*` and `twitter:*` tags are static (crawlers snapshot on first load) and are out of scope per spec Assumptions.

**Limitations noted**: Search engines primarily crawl the initial page load state. Client-side language switching does not provide separate indexable pages per language. This is explicitly accepted in the spec (single URL assumption). If SEO coverage for both languages is needed in the future, server-side routing per language would be required.

---

## Translation String Inventory

**Approximate count**: ~55 strings across 7 groups

| Group       | Strings | Notes                                        |
|-------------|---------|----------------------------------------------|
| SEO         | 2       | title, meta description                      |
| Navigation  | 2       | nav CTA button, aria-label                   |
| Hero        | 6       | tag, title (multiline), subtitle, 2 CTAs, badges |
| Services    | 10      | section tag, heading, 3 × (title + desc)     |
| Technologies| 3       | section tag, heading, section desc           |
| Contact     | 14      | section tag, heading, desc, 3 labels, 3 placeholders, button, success msg, WA/email aria |
| Footer      | 5       | 4 nav links, copyright, tagline              |

**Brand names NOT translated**: Red and Blue, HTML5, CSS3, JavaScript, Node.js, Python, Claude, OpenAI, PostgreSQL, Vercel, GitHub Actions, WhatsApp, Google.
