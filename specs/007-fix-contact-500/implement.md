# Implement: Fix contact 500 + email consistency

## Goal
Eliminate contact form 500 errors and ensure all email references use contact@redandblue.dev.

## Steps
1. Update API sender email.
2. Confirm mailto fallback is correct.
3. Verify deployment config includes RESEND_API_KEY.
4. Test contact form in both configured and unconfigured scenarios.
