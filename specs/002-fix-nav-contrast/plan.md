# Implementation Plan: Fix – Nav Contrast During Hero Scroll

**Branch**: `002-fix-nav-contrast` | **Date**: 2026-02-24 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/002-fix-nav-contrast/spec.md`

---

## Summary

Two root-cause bugs combine to make the navigation unreadable during hero scroll:

1. **JS bug**: The `IntersectionObserver` observing `.hero` fires `scrolled` only when the *entire* hero section has left the viewport — meaning the nav stays transparent throughout the whole hero scroll (potentially 100vh of unreadable nav).

2. **CSS bug**: `.nav.scrolled { background: rgba(var(--bg), 0.85) }` is invalid CSS. `--bg` is a hex value (`#F5F5FA`), not RGB channels. `rgba()` requires numeric channels — the browser silently ignores this property and renders the nav background as `transparent` even when `.scrolled` is active.

**Fix**: Replace the `IntersectionObserver` with a lightweight `scroll` event that toggles `.scrolled` at any `scrollY > 4px`. Fix the CSS by using `color-mix(in srgb, var(--bg) 85%, transparent)` which correctly handles the CSS variable as a full color.

---

## Technical Context

**Language/Version**: CSS3, JavaScript ES6+ (vanilla)
**Primary Dependencies**: None
**Storage**: N/A
**Testing**: Manual browser testing (scroll, dark/light theme, DevTools)
**Target Platform**: All modern browsers (Chromium, Firefox, Safari, Edge)
**Project Type**: Static web application (landing page)
**Performance Goals**: `scroll` handler runs passively — no layout thrashing
**Constraints**: Must preserve transparent nav at scroll = 0; must work in dark + light themes
**Scale/Scope**: 2 files — `css/main.css` (1 property change), `js/main.js` (replace observer with scroll listener)

---

## Constitution Check

| Principle                          | Status | Notes                                                       |
|------------------------------------|--------|-------------------------------------------------------------|
| Performance: Lighthouse ≥90        | ✅ PASS | Passive scroll listener has negligible overhead             |
| Accessibility WCAG AA              | ✅ PASS | Fix directly resolves a contrast violation                   |
| Code modular, maintainable         | ✅ PASS | Simpler code (scroll listener < IntersectionObserver setup) |
| No unnecessary complexity          | ✅ PASS | Removes the observer pattern; replaces with 4 lines          |

---

## Root Cause Analysis

### Bug 1 — JS: Wrong trigger for `.scrolled`

```
IntersectionObserver observes .hero
rootMargin: -68px 0px 0px 0px
→ fires when hero top crosses 68px from viewport top
→ hero starts BELOW nav → hero must scroll 100vh before .scrolled activates
→ nav is transparent the entire hero scroll
```

**Fix**: Replace with `window.addEventListener('scroll', handler, { passive: true })`. Toggle `.scrolled` when `window.scrollY > 4` (small threshold avoids iOS bounce false positive).

### Bug 2 — CSS: Invalid `rgba()` with CSS hex variable

```css
/* BROKEN: var(--bg) = "#F5F5FA" — hex string, not RGB channels */
background: rgba(var(--bg), 0.85);  /* → rgba(#F5F5FA, 0.85) → INVALID → transparent */
```

**Fix**: Use `color-mix()` which accepts any valid CSS color including CSS variables:
```css
/* CORRECT: color-mix treats --bg as a full color value */
background: color-mix(in srgb, var(--bg) 85%, transparent);
```

`color-mix(in srgb, color 85%, transparent)` is supported in all modern browsers (Chrome 111+, Firefox 113+, Safari 16.2+).

---

## Project Structure

### Source Code Changes

```text
css/main.css   ← MODIFIED: fix rgba → color-mix in .nav.scrolled
js/main.js     ← MODIFIED: replace IntersectionObserver with scroll event listener
```

---

## Tasks (for /speckit.tasks)

1. Fix CSS: `.nav.scrolled { background }` → `color-mix(in srgb, var(--bg) 85%, transparent)`
2. Fix JS: Remove IntersectionObserver, add passive scroll listener with `scrollY > 4` threshold
3. Verify: scroll in both themes, confirm contrast at scroll > 0, confirm transparent at scroll = 0
