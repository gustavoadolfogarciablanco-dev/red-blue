# Feature Specification: Fix fixed header contrast over hero

**Feature Branch**: `005-fix-header-contrast`  
**Created**: 2026-02-24  
**Status**: Draft  
**Input**: User description: "Fixed header blends into hero background on initial scroll."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Header is readable from the first scroll (Priority: P1)

As a visitor, the fixed header remains readable when I start scrolling in the hero section.

**Why this priority**: The header is a primary navigation element. If it blends into the hero, it fails at the moment of highest visibility.

**Independent Test**: Load the page and scroll a few pixels. Verify header text and buttons stay readable over the hero background.

**Acceptance Scenarios**:

1. **Given** the page is at the hero, **When** I scroll 1-5 pixels, **Then** the header has sufficient contrast.
2. **Given** I continue scrolling into other sections, **When** the header remains fixed, **Then** it stays readable.

---

### User Story 2 - No visual regression in light or dark mode (Priority: P2)

As a visitor in light or dark theme, the header contrast fix does not create visual artifacts.

**Why this priority**: The fix must work across themes without hurting the design.

**Independent Test**: Switch themes and repeat the scroll test.

**Acceptance Scenarios**:

1. **Given** light theme, **When** I scroll from the hero, **Then** header remains readable.
2. **Given** dark theme, **When** I scroll from the hero, **Then** header remains readable.

---

### Edge Cases

- Smooth scroll starts from anchor links (jump into hero).
- Very short scroll (1-2 pixels) should still trigger contrast.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The fixed header MUST have readable contrast over the hero background at the first scroll.
- **FR-002**: The contrast fix MUST work in both light and dark themes.
- **FR-003**: The fix MUST not cause layout shift or jitter on scroll.

### Key Entities *(include if feature involves data)*

- **Header/Nav**: Fixed navigation bar and its text/controls.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Header text and buttons are readable when scrollY is between 1 and 50 pixels.
- **SC-002**: No regression in readability in light or dark theme.
- **SC-003**: No visible flicker or layout shift when the header background changes.
