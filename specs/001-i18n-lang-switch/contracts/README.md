# Contracts

This folder documents behavior contracts for 001-i18n-lang-switch.

## Behavior
- Language detection: localStorage -> navigator.language -> default `es`.
- Language toggle: switches between ES/EN without reload and persists choice.
- SEO updates: `document.title`, meta description, and `<html lang>` reflect active language.

See `i18n-module.md` for the public API contract.
