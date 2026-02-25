# Implementation Plan: Fix contact 500 + email consistency

**Branch**: `007-fix-contact-500` | **Date**: 2026-02-25 | **Spec**: [spec.md](./spec.md)

## Summary
Ensure contact submissions avoid 500 errors by validating email provider config and unify all email references to contact@redandblue.dev.

## Technical Context
- API handler in [api/contact.js](../../api/contact.js)
- Mailto fallback in [js/main.js](../../js/main.js)
- UI and i18n already updated to contact@redandblue.dev

## Plan
1. Update `FROM_EMAIL` to contact@redandblue.dev.
2. Confirm fallback mailto uses contact@redandblue.dev.
3. Document the required RESEND_API_KEY in spec and verify deployment config.
4. Validate contact form behavior with and without RESEND_API_KEY.

## Validation
- Submit form with valid config and verify 200.
- Remove/disable RESEND_API_KEY and verify clear error + correct mailto fallback.
