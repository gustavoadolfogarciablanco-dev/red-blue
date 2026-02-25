# Checklist: Contact 500 fix

**Purpose**: Verify contact form reliability and email consistency.
**Created**: 2026-02-25
**Feature**: specs/007-fix-contact-500/spec.md

## Validation
- [ ] CHK001 API returns 200 with RESEND_API_KEY
- [ ] CHK002 Fallback uses contact@redandblue.dev without RESEND_API_KEY
- [ ] CHK003 Sender and recipient are contact@redandblue.dev
