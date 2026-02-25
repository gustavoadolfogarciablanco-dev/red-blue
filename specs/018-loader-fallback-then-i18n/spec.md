# Feature Specification: Loader fallback with i18n upgrade

**Feature Branch**: `018-loader-fallback-then-i18n`
**Created**: 2026-02-25
**Status**: Draft
**Input**: Loader should show a static label first, then upgrade to i18n if available.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Static fallback with i18n upgrade (Priority: P1)

As a visitor, I want the loader to show "Cargando" immediately, and switch to the translated value when i18n loads.

**Why this priority**: Avoids raw keys while still supporting localization.

**Independent Test**: Load the page and confirm the loader shows "Cargando" first, then changes if i18n is available.

**Acceptance Scenarios**:

1. **Given** i18n is stale or missing, **When** the loader is shown, **Then** it remains "Cargando" and never shows a key.
2. **Given** i18n loads, **When** it applies translations, **Then** the loader label updates to the translated value.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The loader label MUST have a static HTML fallback.
- **FR-002**: The loader label MUST include i18n bindings for upgrade when available.
- **FR-003**: Missing translations MUST not replace the fallback label.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: No raw keys appear during loading.
- **SC-002**: The loader label updates when translations are available.
