# Feature Specification: Fix contact 500 + email consistency

**Feature Branch**: `007-fix-contact-500`  
**Created**: 2026-02-25  
**Status**: Draft  
**Input**: User report: "Error al enviar el correo: POST /api/contact 500" + requirement: "el unico correo es contact@redandblue.dev"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Contact form sends without 500 (Priority: P1)

As a visitor, I can submit the contact form without a server error.

**Why this priority**: A 500 error blocks conversions.

**Independent Test**: Submit the contact form and confirm success response.

**Acceptance Scenarios**:

1. **Given** a valid contact form submission, **When** I send it, **Then** the server responds 200.
2. **Given** the email service is misconfigured, **When** I submit, **Then** I see a clear error message and the mailto fallback opens with the correct address.

---

### User Story 2 - Single source email (Priority: P1)

As the owner, all system email references use contact@redandblue.dev.

**Why this priority**: Consistency avoids confusing users and misrouted emails.

**Independent Test**: Inspect UI, i18n strings, mailto fallback, and API sender/recipient.

**Acceptance Scenarios**:

1. **Given** the contact CTA and i18n strings, **When** I view the email labels and links, **Then** they use contact@redandblue.dev.
2. **Given** the contact API, **When** an email is sent, **Then** sender and recipient are contact@redandblue.dev.

---

### Edge Cases

- Missing RESEND_API_KEY in production should trigger the fallback mailto with the correct email.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The contact API MUST use contact@redandblue.dev as sender and recipient.
- **FR-002**: The mailto fallback MUST use contact@redandblue.dev.
- **FR-003**: Production MUST have RESEND_API_KEY configured (deployment step).

### Key Entities *(include if feature involves data)*

- **Contact Email**: Sender and recipient address for form submissions.
- **Email Provider Config**: RESEND_API_KEY.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Contact form submit returns 200 when RESEND_API_KEY is configured.
- **SC-002**: All email references use contact@redandblue.dev.
- **SC-003**: Missing RESEND_API_KEY yields a clear error and mailto fallback with contact@redandblue.dev.
