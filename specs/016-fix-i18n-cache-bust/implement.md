# Implement: Fix i18n module cache bust

## Goal
Ensure the i18n module is refreshed on deploy so loader labels never show raw keys.

## Steps
1. Add a version token to the i18n module import in main.js.
2. Bump the main.js version token in index.html.
3. Deploy and verify.
