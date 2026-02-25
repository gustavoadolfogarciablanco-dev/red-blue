# Tasks: Multi-Language Support (ES / EN)

**Input**: Design documents from `specs/001-i18n-lang-switch/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/i18n-module.md ✅

---

## Phase 1: Setup

**Purpose**: Create the i18n module skeleton and project foundation

- [x] T001 Create `js/i18n.js` with ES module exports: `initI18n`, `applyLanguage`, `t`, `getCurrentLang`, and empty `translations` object placeholder

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Translation dictionaries — must be complete before any user story can be tested

⚠️ **CRITICAL**: No user story can be verified until both dictionaries (ES + EN) are complete

- [x] T002 Add complete Spanish (`es`) translation dictionary to `js/i18n.js` — all keys from `data-model.md`: seo (2), nav (2), hero (7), services (8), technologies (3), contact (13), footer (6)
- [x] T003 [P] Add complete English (`en`) translation dictionary to `js/i18n.js` — same key set as ES, all strings translated to English

**Checkpoint**: Both dictionaries complete → user story implementation can begin

---

## Phase 3: User Story 1 – Automatic Language Detection (Priority: P1) 🎯 MVP

**Goal**: Page auto-detects and applies the correct language on first visit with no user action

**Independent Test**: Open site in a browser set to English → verify all text is in English. Repeat with Spanish browser → verify Spanish. Open with French browser → verify Spanish (fallback).

### Implementation for User Story 1

- [x] T004 [US1] Implement `detectLanguage()` in `js/i18n.js`: reads `localStorage.getItem('lang')` → `navigator.language.slice(0,2)` match → default `'es'`
- [x] T005 [US1] Implement `applyLanguage(langCode)` in `js/i18n.js`: sets `currentLang`, calls `localStorage.setItem('lang', langCode)`, updates `document.documentElement.lang`, updates `document.title` and `meta[name="description"]`, iterates all `[data-i18n]` elements and sets `textContent`, iterates `[data-i18n-placeholder]` and sets `placeholder`, iterates `[data-i18n-aria]` and sets `aria-label`
- [x] T006 [US1] Implement `initI18n()` in `js/i18n.js`: calls `detectLanguage()` then `applyLanguage()`; implement `t(key)` and `getCurrentLang()` helpers
- [x] T007 [US1] Import `initI18n` in `js/main.js` and call it as the first action on `DOMContentLoaded`, before GSAP init

**Checkpoint**: Language detection and application work. Page loads in the detected language automatically.

---

## Phase 4: User Story 2 – Language Selector in Navigation (Priority: P2)

**Goal**: Visible toggle button in navigation allows manual language switching; choice persists

**Independent Test**: Find the language selector in the nav. Click to switch ES→EN → verify all content updates instantly. Click EN→ES → verify revert. Reload page → verify language is remembered.

### Implementation for User Story 2

- [x] T008 [US2] Add language selector button to `index.html` inside `.nav__right` (after theme button): `<button class="lang-btn" id="langToggle" type="button">EN</button>` — button label shows the OTHER language
- [x] T009 [US2] Add `.lang-btn` styles to `css/main.css`: matches nav button aesthetics, clear active/hover state, min-width for consistent sizing, responsive on mobile
- [x] T010 [US2] Add `renderLangSelector()` to `js/i18n.js`: wires click event on `#langToggle` to call `applyLanguage(otherLang)` and update button label; call from `initI18n()`
- [x] T011 [US2] Update `applyLanguage()` in `js/i18n.js` to refresh the `#langToggle` button label to show the OTHER language after each switch

**Checkpoint**: Selector visible in nav. Clicking switches language instantly. Reloading preserves choice.

---

## Phase 5: User Story 3 – Full Content Translation (Priority: P3)

**Goal**: Every visible text string in every section has a `data-i18n` attribute and correct dictionary entry

**Independent Test**: Switch to EN, scroll entire page — zero Spanish text visible. Switch to ES — zero English text visible.

### Implementation for User Story 3 — by section

- [x] T012 [P] [US3] Add `data-i18n` attributes to all translatable elements in the **Hero** section of `index.html`: hero tag, title, subtitle, CTA buttons (2), badge texts (2) — 7 attributes total
- [x] T013 [P] [US3] Add `data-i18n` attributes to all translatable elements in the **Services** section of `index.html`: section tag, heading, 3 card titles + 3 card descriptions — 8 attributes total
- [x] T014 [P] [US3] Add `data-i18n` attributes to all translatable elements in the **Technologies** section of `index.html`: section tag, heading, section description — 3 attributes total
- [x] T015 [US3] Add `data-i18n` + `data-i18n-placeholder` + `data-i18n-aria` to all translatable elements in the **Contact** section of `index.html`: section tag, heading, desc, 3 form labels, 3 placeholders, submit button, success message, WA + email aria-labels — 13 attributes total
- [x] T016 [P] [US3] Add `data-i18n` attributes to all translatable elements in the **Footer** and **Navigation** of `index.html`: footer nav links (4), copyright, tagline, nav CTA button — 7 attributes total
- [x] T017 [US3] Move hardcoded Spanish form validation error messages from `js/main.js` to i18n keys (`contact.error.nameRequired`, `contact.error.emailInvalid`, `contact.error.msgRequired`) and update `js/main.js` to use `t()` for these strings

**Checkpoint**: All sections fully translated. No visible strings missing in either language.

---

## Phase 6: User Story 4 – Dynamic SEO Metadata (Priority: P4)

**Goal**: `document.title`, `meta[name="description"]`, and `<html lang>` update on every language switch

**Independent Test**: Switch to EN → open DevTools → verify `<html lang="en">`, `document.title` in English, meta description in English. Switch to ES → verify all revert.

### Implementation for User Story 4

- [x] T018 [US4] Verify `applyLanguage()` (T005) correctly updates `document.title` from `translations[lang]['seo.title']` and `meta[name="description"]` content from `translations[lang]['seo.description']` — add if missing
- [x] T019 [US4] Verify `applyLanguage()` (T005) correctly calls `document.documentElement.setAttribute('lang', langCode)` — add if missing
- [x] T020 [US4] Add `seo.title` and `seo.description` keys with full values to both `es` and `en` dictionaries in `js/i18n.js`

**Checkpoint**: DevTools confirms correct `<html lang>`, title, and meta description in both languages.

---

## Phase 7: Polish & Cross-Cutting

**Purpose**: Final validation, accessibility, and performance checks

- [x] T021 [P] Add `aria-live="polite"` region or screen-reader announcement for language change (e.g., visually-hidden `<span>` that announces "Language changed to English") to `index.html`
- [x] T022 Verify keyboard navigation: Tab to `#langToggle` → Enter/Space activates switch → all content updates; Tab order remains logical after switch
- [x] T023 [P] Manual Lighthouse audit: run in Chrome DevTools on local preview → confirm score ≥90 (performance, accessibility, best practices, SEO)
- [x] T024 Run cross-section completeness check: switch to EN, open DevTools, search DOM for any Spanish-only text not covered by `data-i18n`; fix any gaps
- [x] T025 [P] Update `quickstart.md` if any implementation decisions deviated from design

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup (T001) — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Foundational complete (T002 + T003)
- **US2 (Phase 4)**: Depends on US1 complete (selector needs `applyLanguage` from T005)
- **US3 (Phase 5)**: Depends on Foundational complete; individual section tasks (T012–T016) are parallel
- **US4 (Phase 6)**: Depends on US1 complete (SEO updates inside `applyLanguage`)
- **Polish (Phase 7)**: Depends on all user stories complete

### Parallel Opportunities

```
After T001 (Setup):
  T002 → T003 can run in parallel (separate dictionary blocks in same file)

After T002+T003 (Foundational):
  T004 → T005 → T006 → T007 (US1, sequential)
  US3 section tasks T012, T013, T014, T016 can run in parallel

After US1 complete (T007):
  US2 (T008–T011) and US4 (T018–T020) can run in parallel
```

---

## Implementation Strategy

### MVP (User Story 1 only)

1. T001: Create i18n.js skeleton
2. T002 + T003: Fill dictionaries (ES + EN)
3. T004–T007: Detection + application logic + main.js integration
4. **Validate**: Open site in EN browser → all text in English ✅

### Incremental Delivery

1. MVP (US1) → Auto-detection works
2. Add US2 → Manual selector works, language persists
3. Add US3 → Full translation coverage
4. Add US4 → SEO metadata correct
5. Polish → Accessibility, Lighthouse ≥90

---

## Notes

- [P] = parallelizable (different files or independent sections)
- [USN] = maps task to User Story N
- T012–T016 are parallel because each covers a different HTML section
- T002 and T003 are parallel only if editing separate sections of i18n.js (dictionary blocks)
- Commit after each phase or logical checkpoint
