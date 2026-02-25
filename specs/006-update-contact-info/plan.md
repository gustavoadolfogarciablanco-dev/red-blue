# Implementation Plan: Update contact info and location

**Branch**: `006-update-contact-info` | **Date**: 2026-02-25 | **Spec**: [spec.md](./spec.md)

## Summary
Update location copy to Uruguay and replace WhatsApp number and contact email across UI, i18n, metadata, and contact API.

## Technical Context
- UI copy in [index.html](../../index.html)
- Translations in [js/i18n.js](../../js/i18n.js)
- Contact form fallback in [js/main.js](../../js/main.js)
- Contact API recipient in [api/contact.js](../../api/contact.js)

## Plan
1. Replace "Argentina" with "Uruguay" in HTML and translations.
2. Update WhatsApp link to +598094774410.
3. Update contact email in HTML, aria labels, i18n strings, and mailto fallback.
4. Update JSON-LD contact email and location.
5. Update contact API TO_EMAIL.

## Validation
- Verify contact links and text in both languages.
- Confirm JSON-LD reflects Uruguay and the new email.
- Confirm mailto fallback and API recipient use contact@redandblue.dev.
