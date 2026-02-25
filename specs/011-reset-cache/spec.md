# Feature Specification: Force cache reset for static assets

**Feature Branch**: `011-reset-cache`
**Created**: 2026-02-25
**Status**: Draft
**Input**: Production shows outdated UI due to long-lived asset caching.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Immediate cache reset (Priority: P1)

As the owner, I want all devices to load the latest CSS/JS immediately after deploy.

**Why this priority**: Outdated assets cause the site to differ from local changes.

**Independent Test**: Open the production site in an incognito window and confirm the latest styles and scripts load.

**Acceptance Scenarios**:

1. **Given** a new deployment is live, **When** the homepage loads, **Then** the latest CSS and JS files are fetched (not a cached old version).
2. **Given** long-term caching remains enabled, **When** assets are requested, **Then** they still use the existing cache headers.

---

### Edge Cases

- The cache reset should not require disabling cache headers globally.
- The reset should be achievable by changing a version token only.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The HTML MUST include a cache-busting version token for `css/main.css`.
- **FR-002**: The HTML MUST include a cache-busting version token for `js/main.js`.
- **FR-003**: Existing cache headers remain unchanged.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A fresh load in production requests `css/main.css` and `js/main.js` with the new version token.
- **SC-002**: Vercel still serves the same Cache-Control headers for those assets.
