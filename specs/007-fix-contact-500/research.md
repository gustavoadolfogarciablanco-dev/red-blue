# Research: Contact API 500

## Decision
Change the API sender email to contact@redandblue.dev and document the RESEND_API_KEY requirement for production.

## Rationale
The 500 error is expected if RESEND_API_KEY is missing. Email consistency and deployment config are required to resolve the issue reliably.

## Alternatives Considered
- Keep sender as noreply@redandblue.dev. Rejected due to the single-email requirement.
- Disable the API and always use mailto. Rejected because it removes server-side delivery.
