# Feature Specification: Fix – Nav Contrast During Hero Scroll

**Feature Branch**: `002-fix-nav-contrast`
**Created**: 2026-02-24
**Status**: Draft
**Type**: Bug Fix
**Input**: "Fix header fijo sin contraste en hero: el nav transparente pierde legibilidad al hacer scroll sobre el hero."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 – Readable Navigation During Hero Scroll (Priority: P1)

A visitor opens the landing page and immediately starts scrolling. As they scroll through the hero section, all navigation elements (logo, buttons, links) remain clearly readable against the hero background at every scroll position — from the very first pixel of scroll movement, not just after the hero leaves the screen.

**Why this priority**: This is the only user story — a focused UX/readability bug. Navigation legibility is a baseline usability requirement. Unreadable nav during the primary hero section creates a poor first impression and can cause confusion.

**Independent Test**: Open the landing page. Begin scrolling slowly from the very top. Observe the navigation bar throughout the entire hero section scroll. All nav elements MUST be readable at every scroll position, including the very first pixels of scroll movement.

**Acceptance Scenarios**:

1. **Given** the page is at scroll position 0 (top), **When** the visitor begins scrolling by even 1px, **Then** the navigation bar immediately displays a background that ensures its elements are legible against the hero content below it.
2. **Given** the visitor is scrolling through the hero section at any scroll depth, **When** they look at the navigation, **Then** the logo, language selector, theme button, and CTA button are all clearly readable with sufficient contrast.
3. **Given** the page has reached a non-hero section (services, technologies, etc.), **When** the visitor looks at the navigation, **Then** its appearance is consistent with what was shown while scrolling through the hero.
4. **Given** the visitor is at the very top of the page (scroll = 0, before any scrolling), **When** they look at the navigation, **Then** the nav may appear transparent/minimal (this is the intended hero-top state).

---

### Edge Cases

- What happens in dark mode? → The nav background must maintain contrast in both light and dark themes.
- What happens on mobile? → The fix must apply across all viewport sizes.
- What happens if the user scrolls back to the very top? → The nav may return to its minimal/transparent state at scroll = 0.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The navigation MUST display a background treatment (opacity, blur, or solid) that ensures legibility of all nav elements as soon as the page scroll position exceeds 0px.
- **FR-002**: The navigation background transition MUST be smooth — no abrupt visual jump when the background appears or disappears.
- **FR-003**: The fix MUST work in both light and dark themes.
- **FR-004**: The fix MUST NOT change the navigation's appearance at scroll position 0 (the initial transparent/minimal state at the very top of the page is intentional and should be preserved).
- **FR-005**: The fix MUST NOT introduce layout shift or change the navigation's height or position.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At any scroll position greater than 0px, every navigation element (logo text, button labels, icons) passes WCAG AA contrast ratio (minimum 4.5:1 for normal text, 3:1 for large text/icons) against the nav background.
- **SC-002**: The background transition is visually smooth — no frame where the nav background jumps from invisible to fully opaque.
- **SC-003**: The fix is verified in both light and dark themes with no visual regressions.
- **SC-004**: The Lighthouse accessibility score does not decrease after the fix is applied.

---

## Assumptions

- Scroll position 0 (very top, hero fully visible above fold) intentionally shows a transparent nav — this is a design choice and should be preserved.
- The fix targets only the nav's state during scroll, not its appearance at rest.
- The solution should use the existing `.scrolled` class mechanism or an equivalent simple CSS/JS approach — no new dependencies.
