# Tasks: Fix contact 500 + email consistency

## Phase 1: Diagnose
- [x] T001 Confirm 500 response from /api/contact
- [x] T002 Identify config dependency (RESEND_API_KEY)

## Phase 2: Fix
- [x] T003 Update API sender to contact@redandblue.dev
- [x] T004 Verify mailto fallback uses contact@redandblue.dev
- [x] T005 Document deployment requirement for RESEND_API_KEY

## Phase 3: Verify
- [ ] T006 Verify 200 response with RESEND_API_KEY configured
- [ ] T007 Verify fallback and error messaging without RESEND_API_KEY
