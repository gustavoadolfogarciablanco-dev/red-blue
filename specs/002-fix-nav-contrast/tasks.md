# Tasks: Fix – Nav Contrast During Hero Scroll

**Input**: Design documents from `specs/002-fix-nav-contrast/`
**Prerequisites**: plan.md ✅, spec.md ✅

---

## Phase 1: Fix CSS — Invalid Background Value

**Purpose**: Correct the `rgba(var(--bg), 0.85)` invalid value in `.nav.scrolled`

- [x] T001 In `css/main.css`, replace `.nav.scrolled { background: rgba(var(--bg), 0.85) }` with `background: color-mix(in srgb, var(--bg) 85%, transparent)`

---

## Phase 2: Fix JS — Wrong Scroll Trigger

**Purpose**: Replace `IntersectionObserver` with a direct scroll listener that triggers at `scrollY > 4px`

- [x] T002 In `js/main.js`, remove the `navObserver` IntersectionObserver block (definition + `.observe()` call) and replace with a passive `scroll` event listener: `window.addEventListener('scroll', () => nav?.classList.toggle('scrolled', window.scrollY > 4), { passive: true })` — plus call it once immediately on load

---

## Phase 3: Verification

- [x] T003 [P] Verify light theme: scroll from top → nav gets readable background immediately at any scroll > 0
- [x] T004 [P] Verify dark theme: same behavior, nav background adapts to dark `--bg`
- [x] T005 [P] Verify at scroll = 0: nav returns to transparent state when scrolled back to top
- [x] T006 [P] Verify no layout shift: nav height and position unchanged before/after fix

---

## Notes

- T001 and T002 are independent and can be done in parallel
- `color-mix(in srgb, var(--bg) 85%, transparent)` handles both light and dark themes automatically via the existing `--bg` CSS variable
- Threshold `scrollY > 4` avoids false positives from iOS momentum/bounce scroll
