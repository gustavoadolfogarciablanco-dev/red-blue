# Implementation Plan: Force cache reset for static assets

**Branch**: `011-reset-cache` | **Date**: 2026-02-25 | **Spec**: [spec.md](./spec.md)

## Summary
Add cache-busting version tokens to the CSS and JS asset URLs in the HTML while preserving existing cache headers.

## Technical Context
- Static assets are referenced in [index.html](../../index.html).
- Long-lived cache headers are set in [vercel.json](../../vercel.json).

## Plan
1. Add a version query parameter to `css/main.css` and `js/main.js` URLs.
2. Keep all headers in `vercel.json` unchanged.
3. Deploy and verify assets load with the new version token.

## Validation
- Verify the Network panel shows the versioned asset URLs.
- Confirm Cache-Control headers remain intact.
