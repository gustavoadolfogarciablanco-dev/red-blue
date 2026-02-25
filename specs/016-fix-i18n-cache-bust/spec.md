# Feature Specification: Fix i18n module cache bust

**Feature Branch**: `016-fix-i18n-cache-bust`
**Created**: 2026-02-25
**Status**: Draft
**Input**: `loading.label` appears in production after deploy.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - i18n labels always update (Priority: P1)

As the owner, I want i18n labels to update immediately after a deploy without showing raw keys.

**Why this priority**: Stale module caching causes broken UI labels in production.

**Independent Test**: Deploy, load the homepage on a cold cache, and confirm the loader shows "Cargando" or "Loading" (not the key).

**Acceptance Scenarios**:

1. **Given** a fresh deploy, **When** the page loads, **Then** the loader label shows translated text.
2. **Given** the browser has cached `js/i18n.js`, **When** the new main bundle loads, **Then** the i18n module is fetched with a new cache-busting token.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The i18n module import MUST include a version token to bust cache.
- **FR-002**: The main JS file URL MUST be versioned.
- **FR-003**: i18n fallback behavior remains unchanged.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `loading.label` never appears as a key in production.
- **SC-002**: Network logs show `js/i18n.js` requested with a version token after deploy.
