# Feature Specification: Fix language toggle contrast in dark theme

**Feature Branch**: `004-fix-lang-toggle-contrast`  
**Created**: 2026-02-24  
**Status**: Draft  
**Input**: User description: "In dark theme, the EN label is not visible."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Language toggle is legible in dark theme (Priority: P1)

As a visitor using dark theme, I can see and read the language toggle label at all times.

**Why this priority**: The toggle is useless if it becomes invisible or low-contrast.

**Independent Test**: Switch to dark theme and confirm the language toggle label is readable without hover.

**Acceptance Scenarios**:

1. **Given** dark theme is active, **When** I view the nav, **Then** the language toggle label is readable.
2. **Given** dark theme is active, **When** I hover the toggle, **Then** it remains readable and consistent.

---

### User Story 2 - Toggle remains consistent in light theme (Priority: P2)

As a visitor using light theme, the toggle retains its current look and readability.

**Why this priority**: Fixing dark mode must not regress light mode.

**Independent Test**: Switch to light theme and confirm the toggle still matches the nav style.

**Acceptance Scenarios**:

1. **Given** light theme is active, **When** I view the nav, **Then** the toggle looks unchanged and readable.

---

### Edge Cases

- The theme is set to auto and follows system preference changes.
- The toggle text updates from ES to EN while in dark theme.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The language toggle MUST have sufficient contrast in dark theme.
- **FR-002**: The toggle MUST remain readable in light theme (no regressions).
- **FR-003**: The toggle MUST remain readable on hover and focus states.

### Key Entities *(include if feature involves data)*

- **Language Toggle**: The nav control used to switch ES/EN.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The toggle text is readable in dark theme at a normal viewing distance.
- **SC-002**: The toggle text remains readable in light theme with no visual regression.
- **SC-003**: The toggle meets a contrast ratio target of 4.5:1 or higher in dark theme.
