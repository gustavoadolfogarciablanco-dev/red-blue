# Implement: Fix mobile X scroll and i18n fallback

## Goal
Remove horizontal scroll on narrow mobile screens and prevent raw i18n keys from showing.

## Steps
1. Add overflow guards and tighter nav styles for <= 420px.
2. Add i18n fallback to avoid replacing content with raw keys.
3. Bump asset version tokens and deploy.
