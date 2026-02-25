# Feature Specification: Force HTML revalidation for cache reset

**Feature Branch**: `012-force-html-revalidate`
**Created**: 2026-02-25
**Status**: Draft
**Input**: Safari serves stale HTML, preventing updated assets from loading.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Fresh HTML on all devices (Priority: P1)

As the owner, I want clients to revalidate the HTML so the latest asset URLs load immediately.

**Why this priority**: Stale HTML keeps pointing to old assets.

**Independent Test**: Load the homepage and confirm updated HTML is delivered.

**Acceptance Scenarios**:

1. **Given** a new deployment, **When** the homepage loads, **Then** HTML is revalidated.
2. **Given** assets are cached long-term, **When** CSS/JS are requested, **Then** their cache headers remain unchanged.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Root HTML responses MUST include revalidation cache headers.
- **FR-002**: CSS/JS cache headers remain unchanged.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: HTML is revalidated on refresh.
- **SC-002**: CSS/JS cache headers remain immutable.
