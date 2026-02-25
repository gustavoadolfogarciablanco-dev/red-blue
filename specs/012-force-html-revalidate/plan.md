# Implementation Plan: Force HTML revalidation for cache reset

**Branch**: `012-force-html-revalidate` | **Date**: 2026-02-25 | **Spec**: [spec.md](./spec.md)

## Summary
Add HTML revalidation headers for the root document and keep asset cache headers unchanged.

## Technical Context
- Headers are defined in [vercel.json](../../vercel.json).
- Assets are referenced in [index.html](../../index.html).

## Plan
1. Add Cache-Control revalidation for `/` and `/index.html`.
2. Deploy and verify HTML revalidation.

## Validation
- Network panel shows HTML revalidation headers.
- CSS/JS headers remain unchanged.
