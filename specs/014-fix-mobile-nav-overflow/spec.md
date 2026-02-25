# Feature Specification: Fix mobile nav overflow on Samsung S25 Ultra

**Feature Branch**: `014-fix-mobile-nav-overflow`
**Created**: 2026-02-25
**Status**: Draft
**Input**: On Samsung S25 Ultra, the "Iniciar proyecto" button overflows and causes horizontal scroll.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - No horizontal scroll (Priority: P1)

As a visitor on a narrow mobile device, I want the header to fit without horizontal scrolling.

**Why this priority**: Overflow breaks the first impression and hurts usability.

**Independent Test**: Load the homepage on a 360-420px wide viewport and confirm no horizontal scroll.

**Acceptance Scenarios**:

1. **Given** a 360-420px wide viewport, **When** the page loads, **Then** the nav fits without horizontal scroll.
2. **Given** the header CTA is visible, **When** the nav renders, **Then** the CTA is not clipped.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The nav layout MUST not cause horizontal scrolling on small screens.
- **FR-002**: The CTA button remains visible and readable on small screens.
- **FR-003**: Layout adjustments are applied via responsive CSS breakpoints.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: No horizontal scroll on Samsung S25 Ultra (or 360-420px width simulators).
- **SC-002**: The "Iniciar proyecto" CTA is fully visible.
