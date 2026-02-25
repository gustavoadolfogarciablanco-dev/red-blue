# Implement: Remove ESM warning for contact API

## Goal
Eliminate the Vercel ESM warning by using CommonJS exports in the contact API handler while preserving behavior.

## Steps
1. Update the export to `module.exports` in api/contact.js.
2. Confirm no other ESM-only syntax is required.
3. Validate build logs and POST behavior.
