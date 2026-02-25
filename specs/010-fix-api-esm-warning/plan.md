# Implementation Plan: Remove ESM warning for contact API

**Branch**: `010-fix-api-esm-warning` | **Date**: 2026-02-25 | **Spec**: [spec.md](./spec.md)

## Summary
Convert the contact API handler to CommonJS exports to eliminate the Vercel ESM warning without changing behavior.

## Technical Context
- API handler in [api/contact.js](../../api/contact.js)
- Vercel warns when `export default` is used without a module type.

## Plan
1. Replace the ESM `export default` with `module.exports`.
2. Keep all logic and responses identical.
3. Deploy and verify the warning no longer appears in build logs.

## Validation
- Build log shows no ESM warning for api/contact.js.
- POST /api/contact returns the same responses as before.
