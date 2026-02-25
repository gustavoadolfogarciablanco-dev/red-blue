# Feature Specification: Services section expansion + i18n

**Feature Branch**: `008-services-detail-i18n`  
**Created**: 2026-02-25  
**Status**: Draft  
**Input**: User request to expand Services copy, add bullet highlights and CTA, internationalize all new text, add a more professional heading, and add three additional services.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Clear service value (Priority: P1)

As a visitor, I can read expanded service descriptions, benefits, and CTAs.

**Why this priority**: The Services section is a conversion driver and must be detailed and clear.

**Independent Test**: Scroll to Services and verify each card shows title, subtitle, description, bullets, and CTA (6 services total).

**Acceptance Scenarios**:

1. **Given** the Services section is visible, **When** I read a service card, **Then** it includes title, subtitle, description, bullet list, and CTA.
2. **Given** I click “Solicitar informacion”, **When** I click any service CTA, **Then** the page scrolls to Contacto.
3. **Given** the Services grid is visible, **When** I scan the cards, **Then** backgrounds alternate between a white surface and the header background gray across all six services.
4. **Given** no card is marked as featured, **When** I view the grid, **Then** all cards participate in the alternation.

---

### User Story 2 - Full internationalization (Priority: P1)

As a bilingual visitor, all new content appears correctly in ES and EN.

**Why this priority**: Mixed language content would reduce trust and clarity.

**Independent Test**: Toggle language and confirm all service texts change.

**Acceptance Scenarios**:

1. **Given** Spanish is active, **When** I view Services, **Then** all texts are Spanish.
2. **Given** English is active, **When** I view Services, **Then** all texts are English.

---

### Edge Cases

- CTA text must be consistent across all cards.
- i18n keys must match default HTML content on initial load.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Services section MUST include the new intro paragraph.
- **FR-002**: Each service MUST show title, subtitle, description, bullet list, and CTA.
- **FR-006**: The Services section MUST include six services with distinct positioning.
- **FR-003**: All new text MUST be internationalized in ES and EN.
- **FR-004**: CTA buttons MUST link to `#contacto`.
- **FR-005**: Icons MUST be appropriate to each service.
- **FR-007**: Service card backgrounds MUST alternate between white and the header background gray across all six cards.
- **FR-008**: No service card MUST use a featured style; all cards follow the alternating background pattern.

### Key Entities *(include if feature involves data)*

- **Service Card**: Title, subtitle, description, bullets, CTA, icon.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All six service cards show the expanded content and CTA.
- **SC-002**: Language toggle updates all service content.
- **SC-003**: CTAs navigate to Contacto on click.
- **SC-004**: Alternating card backgrounds use the header gray and are visible across all six services.
- **SC-005**: All six cards follow the alternating background pattern with no featured styling.
