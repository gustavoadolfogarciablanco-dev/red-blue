# Feature Specification: Static loader label fallback

**Feature Branch**: `017-static-loader-label`
**Created**: 2026-02-25
**Status**: Draft
**Input**: `loading.label` still appears in production.

## Context / Limitation
The i18n fix depends on fresh JS module delivery. Since the loader appears before JS is guaranteed to run, we cannot rely on i18n to render the loader label.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Loader never shows raw key (Priority: P1)

As a visitor, I want the loader to always show a human label, even if i18n fails to load.

**Why this priority**: Raw keys look broken in production.

**Independent Test**: Load the homepage and confirm the loader shows "Cargando" (or equivalent) and never `loading.label`.

**Acceptance Scenarios**:

1. **Given** i18n fails or is stale, **When** the loader is shown, **Then** it displays a static label.
2. **Given** i18n loads, **When** the loader is shown, **Then** the label remains human-readable.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The loader label MUST be static in HTML (not replaced by i18n).
- **FR-002**: The loader aria-label MUST be static in HTML.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The loader never displays the raw `loading.label` key.
