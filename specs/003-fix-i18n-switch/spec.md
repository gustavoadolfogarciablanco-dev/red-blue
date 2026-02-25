# Feature Specification: Fix i18n switch not applying language

**Feature Branch**: `003-fix-i18n-switch`  
**Created**: 2026-02-24  
**Status**: Draft  
**Input**: User description: "Clicking EN does not change language."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Switch language updates all content (Priority: P1)

As a visitor, I can click the language toggle and see the entire page update to the selected language without a reload.

**Why this priority**: This is the core value of i18n. If the switch does nothing, the feature fails.

**Independent Test**: Load the page, click EN, verify all visible text changes to English. Click ES, verify it returns to Spanish.

**Acceptance Scenarios**:

1. **Given** the page is in Spanish, **When** I click EN, **Then** all visible content changes to English immediately.
2. **Given** the page is in English, **When** I click ES, **Then** all visible content changes to Spanish immediately.

---

### User Story 2 - Metadata and lang attribute update (Priority: P2)

As a visitor, the page title, meta description, and html lang attribute update to match the active language.

**Why this priority**: SEO and accessibility must stay in sync with the displayed language.

**Independent Test**: Switch to EN and inspect `document.title`, meta description, and `<html lang>`. Switch back to ES and verify changes revert.

**Acceptance Scenarios**:

1. **Given** the active language is English, **When** I switch, **Then** `document.title` and meta description are in English.
2. **Given** the active language is Spanish, **When** I switch, **Then** `document.title` and meta description are in Spanish.
3. **Given** any language, **When** I switch, **Then** `<html lang>` matches the active language.

---

### Edge Cases

- The toggle button exists but click handlers are not attached.
- A translation key is missing for a node with `data-i18n`.
- The toggle is clicked before the i18n module initializes.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Clicking the language toggle MUST call the language switch logic and update the page.
- **FR-002**: All `data-i18n`, `data-i18n-html`, `data-i18n-placeholder`, and `data-i18n-aria` nodes MUST update on switch.
- **FR-003**: `document.title` MUST update on switch.
- **FR-004**: `meta[name="description"]` MUST update on switch.
- **FR-005**: `<html lang>` MUST update on switch.
- **FR-006**: The current language MUST persist in `localStorage` and be applied on reload.

### Key Entities *(include if feature involves data)*

- **Language Preference**: Active language code stored in `localStorage`.
- **Translation Key**: Key used by `data-i18n*` attributes to map strings.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Switching to EN updates all visible strings within 300 ms.
- **SC-002**: Switching to ES updates all visible strings within 300 ms.
- **SC-003**: Title, meta description, and html lang match the active language after each switch.
- **SC-004**: Language choice persists across a page reload in the same browser.
