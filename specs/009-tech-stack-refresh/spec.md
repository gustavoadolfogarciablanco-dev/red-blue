# Feature Specification: Tech stack section refresh + filters

**Feature Branch**: `009-tech-stack-refresh`  
**Created**: 2026-02-25  
**Status**: Draft  
**Input**: User request to redesign the tech stack section with richer layout, interactive category filters, additional technologies, and full i18n.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Professional tech overview (Priority: P1)

As a visitor, I can read a professional tech stack summary with categorized cards.

**Why this priority**: The section communicates capability and credibility.

**Independent Test**: Scroll to Tecnologias and confirm heading, intro, filters, and rich cards.

**Acceptance Scenarios**:

1. **Given** the Tech Stack section is visible, **When** I scan the content, **Then** I see a heading, intro, filter buttons, and a grid of cards.
2. **Given** the cards are visible, **When** I read one, **Then** it shows a tech name and short description without redundant labels.

---

### User Story 2 - Interactive filters (Priority: P1)

As a visitor, I can filter by category to view relevant technologies.

**Why this priority**: Filters reduce visual noise and improve focus.

**Independent Test**: Click each filter and confirm cards update.

**Acceptance Scenarios**:

1. **Given** I click a category filter, **When** the grid updates, **Then** only matching cards remain visible.
2. **Given** I click "Todos", **When** the grid updates, **Then** all cards are visible.

---

### User Story 3 - Full internationalization (Priority: P1)

As a bilingual visitor, all new text is translated in ES and EN.

**Why this priority**: Mixed language content reduces trust.

**Independent Test**: Toggle language and confirm headings, filter labels, and card descriptions change.

**Acceptance Scenarios**:

1. **Given** Spanish is active, **When** I view Tecnologias, **Then** all new text is Spanish.
2. **Given** English is active, **When** I view Tecnologias, **Then** all new text is English.

---

### Edge Cases

- Filters should be keyboard accessible and keep focus styles.
- Empty filter results should never occur (at least one card per category).
- The summary count should update on every filter change.

---

### User Story 4 - Usable and scannable layout (Priority: P1)

As a visitor, I can scan technologies without visual clutter and see how many items match a filter.

**Why this priority**: Dense lists need clarity to feel trustworthy and easy to use.

**Independent Test**: Apply filters and confirm the count and card text remain fully readable.

**Acceptance Scenarios**:

1. **Given** I click a filter, **When** the grid updates, **Then** I see an updated result count.
2. **Given** a card description is long, **When** I read it, **Then** the text is not truncated.

---

### User Story 5 - Compact cards with hover detail (Priority: P1)

As a visitor, I see compact cards with official icons and reveal descriptions on hover for more space.

**Why this priority**: Keeping cards compact improves scanning and lets descriptions appear only when needed.

**Independent Test**: Hover a card and confirm the description appears while the icon recedes.

**Acceptance Scenarios**:

1. **Given** I view the grid, **When** I scan cards, **Then** I see a simplified icon and tech name without the description.
2. **Given** I hover a card, **When** it expands, **Then** the description appears and the icon is de-emphasized.
3. **Given** I am on touch or keyboard, **When** I focus a card, **Then** the description is visible.

---

### User Story 6 - Official icon flip cards (Priority: P1)

As a visitor, I see official stack icons centered with the title below, and a flip animation reveals the full description.

**Why this priority**: Official icons increase trust and the flip interaction improves focus.

**Independent Test**: Hover and tap a card to see the flip reveal and equal-sized cards.

**Acceptance Scenarios**:

1. **Given** I view the grid, **When** I scan cards, **Then** I see the official icon centered with the tech name below.
2. **Given** I hover or tap a card, **When** it flips, **Then** the description is fully visible on the back.
3. **Given** the grid is visible, **When** I compare cards, **Then** all cards share the same height.
4. **Given** I scan the icons, **When** I compare cards, **Then** the icon colors alternate red and blue (not brand colors).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The tech section MUST include a new heading and intro paragraph.
- **FR-002**: The section MUST include filter buttons for: All, Frontend, Backend, AI, plus service-aligned categories (Data/Analytics, Automation, Cloud/DevOps, UX/Product) as needed.
- **FR-003**: Filters MUST show/hide cards without page reload.
- **FR-004**: Each card MUST show name and description (no redundant category labels).
- **FR-005**: Add more enterprise-grade technologies across categories.
- **FR-005a**: Include JavaScript and Nuxt in Frontend, Rust and Nest in Backend, Splunk in Data/Analytics, and Amplitude in UX/Product.
- **FR-006**: All new text MUST be internationalized in ES and EN.
- **FR-007**: The section MUST show a visible count of matching technologies.
- **FR-008**: Card descriptions MUST be fully readable (no truncation).
- **FR-009**: Cards MUST display a simplified official icon and tech name by default, revealing descriptions on hover/focus.
- **FR-010**: Card accents MUST alternate between red and blue for visual rhythm.
- **FR-011**: Cards MUST use official stack icons centered with the title beneath.
- **FR-012**: Cards MUST use a flip animation to reveal descriptions on hover/focus and tap.
- **FR-013**: Card heights MUST be consistent across the grid.
- **FR-014**: Icon colors MUST alternate red and blue, not their original brand colors.
- **FR-015**: Card descriptions MUST be expanded with relevant detail to fill the flip back.
- **FR-016**: If an official icon cannot be loaded, the icon container MUST be hidden.
- **FR-017**: Section titles and subtitles MUST use the full available width on small screens.
- **FR-018**: Service cards MUST not display icon containers.

### Key Entities *(include if feature involves data)*

- **Tech Card**: name, category, description, icon.
- **Tech Filter**: label, category key.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Filters toggle visibility correctly for each category.
- **SC-002**: All new text is translated in ES and EN.
- **SC-003**: The tech grid remains responsive at 1024px/768px/480px.
- **SC-004**: The result count matches the visible cards for every filter.
- **SC-005**: Hover/focus reveals descriptions without clipping or layout shift.
- **SC-006**: All cards render at the same height in each breakpoint.
- **SC-007**: Icon colors alternate red/blue across the grid.
- **SC-008**: Expanded descriptions read cleanly without truncation.
- **SC-009**: Cards with missing icons render without empty icon placeholders.
- **SC-010**: Section headings and descriptions span the full container width on mobile.
