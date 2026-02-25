# Feature Specification: Fix mobile X scroll and i18n fallback

**Feature Branch**: `015-fix-mobile-x-scroll-and-i18n-fallback`
**Created**: 2026-02-25
**Status**: Draft
**Input**: Samsung S25 Ultra shows horizontal scroll and the loader shows translation keys.

**Observed Cause (analysis)**: The production i18n bundle can be stale or missing the `loading.*` entries, so `t(key)` falls back to the raw key and replaces the label with `loading.label`.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - No horizontal scroll on mobile (Priority: P1)

As a mobile user, I want the header to fit without causing horizontal scroll.

**Why this priority**: Horizontal scroll breaks usability and looks unprofessional.

**Independent Test**: Load the homepage at 360-420px width and confirm no horizontal scroll.

**Acceptance Scenarios**:

1. **Given** a 360-420px viewport, **When** the page loads, **Then** no horizontal scroll is present.
2. **Given** the nav CTA is visible, **When** the header renders, **Then** the CTA is fully visible without overflow.

---

### User Story 2 - Missing translation fallback (Priority: P1)

As a visitor, I want the loader text to show a human label even if a translation key is missing.

**Why this priority**: Seeing raw i18n keys looks broken in production.

**Independent Test**: Force a missing translation and confirm the UI keeps the existing label instead of the key.

**Acceptance Scenarios**:

1. **Given** a translation key is missing, **When** i18n is applied, **Then** the original text remains unchanged.
2. **Given** translations exist, **When** i18n applies, **Then** the translated label is shown.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The layout MUST not create horizontal scroll on small screens.
- **FR-002**: The nav CTA remains visible and readable on small screens.
- **FR-003**: i18n MUST not replace content with raw keys when a translation is missing.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: No horizontal scroll on Samsung S25 Ultra or 360-420px emulators.
- **SC-002**: Loader text never shows raw i18n keys.
