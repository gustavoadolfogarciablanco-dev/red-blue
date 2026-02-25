# Feature Specification: Update contact info and location

**Feature Branch**: `006-update-contact-info`  
**Created**: 2026-02-25  
**Status**: Draft  
**Input**: User description: "Cambie donde diga Argentina por Uruguay, ademas el numero de whatsap debe ser +598094774410 y por el correo por contact@redandblue.dev"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Contact details are accurate (Priority: P1)

As a visitor, I can see and use the correct WhatsApp number and contact email.

**Why this priority**: Contact details drive conversions and must be correct.

**Independent Test**: Open the contact section and verify the WhatsApp link, mailto link, and displayed email.

**Acceptance Scenarios**:

1. **Given** the contact section is visible, **When** I click the WhatsApp CTA, **Then** the link targets +598094774410.
2. **Given** the contact section is visible, **When** I click the email CTA, **Then** it opens contact@redandblue.dev.

---

### User Story 2 - Location text reflects Uruguay (Priority: P2)

As a visitor, I see Uruguay where the site mentions the founding location.

**Why this priority**: Location copy must match the business reality.

**Independent Test**: Review footer and translations in both languages.

**Acceptance Scenarios**:

1. **Given** Spanish is active, **When** I view the footer, **Then** it reads "Hecho con precision en Uruguay."
2. **Given** English is active, **When** I view the footer, **Then** it reads "Made with precision in Uruguay."

---

### Edge Cases

- i18n strings must match the default HTML text on load.
- Metadata must not reference the old location or email.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: All visible references to Argentina MUST be updated to Uruguay.
- **FR-002**: The WhatsApp CTA MUST target +598094774410.
- **FR-003**: The contact email MUST be contact@redandblue.dev in UI, aria labels, and mailto fallbacks.
- **FR-004**: JSON-LD organization metadata MUST use Uruguay and contact@redandblue.dev.
- **FR-005**: The contact API MUST send to contact@redandblue.dev.

### Key Entities *(include if feature involves data)*

- **Contact Info**: Location label, WhatsApp number, contact email.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Footer and translations mention Uruguay instead of Argentina.
- **SC-002**: WhatsApp link resolves to +598094774410.
- **SC-003**: Email CTA and mailto fallback use contact@redandblue.dev.
- **SC-004**: JSON-LD metadata shows Uruguay and contact@redandblue.dev.
- **SC-005**: Contact API uses contact@redandblue.dev as recipient.
