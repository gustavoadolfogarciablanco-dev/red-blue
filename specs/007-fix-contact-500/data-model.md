# Data Model: Contact email + provider config

## Entities
- ContactEmail
  - sender: "contact@redandblue.dev"
  - recipient: "contact@redandblue.dev"
- EmailProviderConfig
  - RESEND_API_KEY: string

## Constraints
- Sender and recipient must be the same address.
- RESEND_API_KEY must be present in production.
