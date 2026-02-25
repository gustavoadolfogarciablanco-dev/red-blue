# Feature Specification: Update README to current project

**Feature Branch**: `019-update-readme`
**Created**: 2026-02-25
**Status**: Draft
**Input**: README is outdated and does not reflect the current repo structure or cache strategy.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Accurate project overview (Priority: P1)

As a contributor, I want the README to match the current structure and deployment behavior.

**Why this priority**: Onboarding and maintenance depend on accurate docs.

**Independent Test**: Read README and confirm it matches the repo structure and cache rules.

**Acceptance Scenarios**:

1. **Given** the current repo layout, **When** the README is reviewed, **Then** the described structure matches the actual folders/files.
2. **Given** the current cache policy, **When** the README is reviewed, **Then** it accurately describes HTML no-store and versioned assets.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: README MUST list the current folders and key files.
- **FR-002**: README MUST describe i18n, GSAP, and Vercel usage.
- **FR-003**: README MUST describe the current cache behavior.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: README aligns with the repository structure.
- **SC-002**: README reflects the current cache strategy.
