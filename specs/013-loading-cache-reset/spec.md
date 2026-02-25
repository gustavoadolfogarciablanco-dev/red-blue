# Feature Specification: Loading gate + hard HTML cache reset

**Feature Branch**: `013-loading-cache-reset`
**Created**: 2026-02-25
**Status**: Draft
**Input**: iOS Safari shows stale HTML and a poor first-load experience while assets and i18n load.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Professional first load (Priority: P1)

As the owner, I want a loading gate so the UI never flashes broken content while assets and i18n initialize.

**Why this priority**: First impressions are critical in production.

**Independent Test**: Load the site on a cold cache and confirm a brief loader appears before content renders cleanly.

**Acceptance Scenarios**:

1. **Given** a first visit on mobile, **When** the page loads, **Then** a loading overlay appears briefly and the UI renders without untranslated placeholders.
2. **Given** JS fails, **When** the timeout elapses, **Then** the loader hides and the page remains usable.

---

### User Story 2 - Hard HTML cache reset (Priority: P1)

As the owner, I want the HTML to bypass cache so all devices receive the latest document.

**Why this priority**: Stale HTML keeps pointing to old assets and content.

**Independent Test**: Reload in iOS Safari and confirm the HTML request is revalidated and updated.

**Acceptance Scenarios**:

1. **Given** a new deployment, **When** the homepage loads, **Then** the HTML response uses a no-store policy.
2. **Given** assets are cached long-term, **When** CSS/JS are requested, **Then** their cache headers remain unchanged.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A loading overlay MUST be shown until i18n is applied and the page load event fires (or a timeout occurs).
- **FR-002**: The loader MUST auto-dismiss on timeout to avoid blocking if JS fails.
- **FR-003**: The root HTML MUST use a no-store cache policy.
- **FR-004**: CSS/JS cache headers remain unchanged.
- **FR-005**: CSS/JS URLs include a new version token.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: No untranslated placeholders are visible during first load.
- **SC-002**: iOS Safari fetches fresh HTML after deploy.
- **SC-003**: CSS/JS cache headers remain immutable.
