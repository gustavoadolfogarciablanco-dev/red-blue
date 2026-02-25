# Feature Specification: Remove ESM warning for contact API

**Feature Branch**: `010-fix-api-esm-warning`  
**Created**: 2026-02-25  
**Status**: Draft  
**Input**: Vercel build warning: serverless function uses ESM syntax without module type.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Clean deployment logs (Priority: P1)

As the owner, I want to remove the ESM warning without changing API behavior.

**Why this priority**: Warnings obscure real issues and can signal future breakage.

**Independent Test**: Trigger a build and confirm the ESM warning no longer appears.

**Acceptance Scenarios**:

1. **Given** the contact API is deployed, **When** the build completes, **Then** there is no ESM warning for api/contact.js.
2. **Given** the contact API is invoked, **When** a valid POST is sent, **Then** the response behavior remains unchanged.

---

### Edge Cases

- API should continue to work with the same runtime defaults.
- No project-wide module type changes should be required.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The contact API MUST use CommonJS exports to avoid ESM warnings.
- **FR-002**: No project-wide module type changes are introduced.
- **FR-003**: The handler behavior and response payloads remain unchanged.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The Vercel build log no longer emits the ESM warning for api/contact.js.
- **SC-002**: Contact form POST responses match the previous behavior.
