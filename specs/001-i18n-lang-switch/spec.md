# Feature Specification: Multi-Language Support (ES / EN)

**Feature Branch**: `001-i18n-lang-switch`
**Created**: 2026-02-24
**Status**: Draft
**Input**: User description: "Soporte de idiomas: es y en. Selector de idioma visible. Detección inicial con navigator.language, fallback a es. Todo el contenido visible traducido (hero, servicios, tecnologías, contacto, footer). SEO dinámico por idioma: title y meta description cambian según idioma (misma URL)."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 – Automatic Language Detection on First Visit (Priority: P1)

A first-time visitor arrives at the landing page. The page reads their browser's preferred language setting and automatically displays the site in that language — Spanish if their browser is configured to any Spanish variant, English otherwise. No action is required from the visitor.

**Why this priority**: This is the foundation of the feature. If the site cannot detect and apply the correct language automatically, all other language-related experiences break. Delivering the right language immediately reduces cognitive friction and signals professionalism.

**Independent Test**: Open the site in a browser set to English → verify all visible text appears in English. Repeat with a browser set to Spanish → verify all text appears in Spanish. The feature delivers value immediately without requiring any other user story.

**Acceptance Scenarios**:

1. **Given** a browser whose preferred language is English (any `en-*` variant), **When** the visitor loads the landing page for the first time, **Then** all visible page content is displayed in English.
2. **Given** a browser whose preferred language is Spanish (any `es-*` variant), **When** the visitor loads the landing page for the first time, **Then** all visible page content is displayed in Spanish.
3. **Given** a browser whose preferred language is neither English nor Spanish (e.g., French, German), **When** the visitor loads the landing page for the first time, **Then** all visible content is displayed in Spanish (default fallback).
4. **Given** a browser with no language setting available, **When** the visitor loads the landing page, **Then** content is displayed in Spanish (default fallback).

---

### User Story 2 – Visible Language Selector in Navigation (Priority: P2)

A visitor who prefers a different language than the one auto-detected can switch languages at any time using a clearly visible control in the navigation bar. The switch is immediate and persists for the rest of the session.

**Why this priority**: Auto-detection is accurate but not infallible. Users traveling, sharing devices, or with misconfigured browsers must have a reliable manual override. The selector must be prominent enough to find without searching.

**Independent Test**: Identify the language selector in the navigation. Click to switch to English while site is in Spanish → verify all content switches instantly. Click to switch back to Spanish → verify content reverts. Can be tested independently of auto-detection.

**Acceptance Scenarios**:

1. **Given** the site is displayed in any language, **When** the visitor looks at the navigation bar, **Then** a language selector control is clearly visible without scrolling or hovering on any device size.
2. **Given** the site is displayed in Spanish, **When** the visitor selects English from the selector, **Then** all visible page content switches to English immediately without a full page reload.
3. **Given** the site is displayed in English, **When** the visitor selects Spanish from the selector, **Then** all visible page content switches to Spanish immediately without a full page reload.
4. **Given** the visitor has switched to a specific language manually, **When** they scroll through the page or interact with any section, **Then** the language remains unchanged.
5. **Given** the visitor has selected a language, **When** they reload the page in the same session, **Then** their language preference is preserved.

---

### User Story 3 – Full Content Translation Across All Sections (Priority: P3)

Every section of the landing page — Hero, Services, Technologies, Contact, and Footer — displays its content in the currently active language. No visible text remains in the wrong language after a switch.

**Why this priority**: Partial translations create a confusing, unprofessional impression. Once detection and switching are in place (P1 and P2), this story ensures completeness and consistency throughout the entire page.

**Independent Test**: Set language to English. Scroll through every section and verify no Spanish text is visible. Repeat for Spanish. Each section can be verified independently.

**Acceptance Scenarios**:

1. **Given** the active language is English, **When** a visitor views the Hero section, **Then** the headline, subheadline, and CTA button text are all in English.
2. **Given** the active language is English, **When** a visitor views the Services section, **Then** all service names, descriptions, and labels are in English.
3. **Given** the active language is English, **When** a visitor views the Technologies section, **Then** all descriptive text is in English (technology brand names remain unchanged).
4. **Given** the active language is English, **When** a visitor views the Contact section, **Then** all form labels, placeholders, button text, and supporting copy are in English.
5. **Given** the active language is English, **When** a visitor views the Footer, **Then** all footer text (links, taglines, legal notices) is in English.
6. All of the above scenarios apply symmetrically for Spanish.

---

### User Story 4 – Dynamic SEO Metadata Per Language (Priority: P4)

When a visitor or search engine crawler views the page in a specific language, the page's browser tab title and search-engine description accurately reflect the active language. The page URL does not change between languages.

**Why this priority**: Correct metadata ensures search engines index the appropriate content for each language audience, directly impacting organic reach to both Spanish-speaking and English-speaking markets.

**Independent Test**: Switch to English → inspect browser tab title and meta description → verify both are in English. Switch to Spanish → verify both return to Spanish. Validated via browser developer tools.

**Acceptance Scenarios**:

1. **Given** the active language is Spanish, **When** any visitor or crawler reads the page metadata, **Then** the browser tab title is in Spanish and accurately describes the site.
2. **Given** the active language is English, **When** any visitor or crawler reads the page metadata, **Then** the browser tab title is in English and accurately describes the site.
3. **Given** the active language is Spanish, **When** the page meta description is read, **Then** it is in Spanish and relevant to Red and Blue's services.
4. **Given** the active language is English, **When** the page meta description is read, **Then** it is in English and relevant to Red and Blue's services.
5. **Given** a visitor switches languages, **When** they observe the browser address bar, **Then** the URL remains identical regardless of the active language.

---

### Edge Cases

- What happens if a visitor's browser reports a regional variant like `en-AU` or `es-MX`? → The language prefix (`en`, `es`) MUST be used for matching; regional variants map to their base language.
- What happens if the visitor switches language while a form is partially filled? → Form field values MUST be preserved; only placeholder and label text should update.
- What happens with screen readers or assistive technology? → The language switch MUST update the page's declared language attribute so screen readers announce content correctly.
- What happens if a visitor's stored language preference conflicts with their current browser language? → The stored preference takes priority on subsequent visits.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST detect the visitor's preferred language from the browser on the first page load and apply it automatically before any content becomes visible.
- **FR-002**: The site MUST default to Spanish when the detected browser language is not English or Spanish, or when detection is unavailable.
- **FR-003**: The site MUST display a language selector control in the navigation bar that is visible and operable on all viewport sizes (desktop, tablet, mobile).
- **FR-004**: The selector MUST offer exactly two options: Spanish (ES) and English (EN).
- **FR-005**: Switching languages via the selector MUST update all visible page content instantly without a full page reload.
- **FR-006**: The visitor's language selection MUST be persisted across the current session and across future visits to the same site from the same browser.
- **FR-007**: ALL visible user-facing text in the following sections MUST be available in both languages: Hero, Services, Technologies, Contact form (labels, placeholders, button, feedback messages), Footer, and Navigation.
- **FR-008**: Brand names, logos, and technology product names (e.g., "Vercel", "Node.js", "React") MUST NOT be translated.
- **FR-009**: The page title displayed in the browser tab MUST update dynamically to reflect the active language.
- **FR-010**: The page meta description MUST update dynamically to reflect the active language.
- **FR-011**: The page's declared language attribute MUST update to reflect the active language.
- **FR-012**: The page URL MUST remain identical regardless of the active language.

### Key Entities

- **Language**: One of two supported options (ES or EN). Has a code identifier and a display label used in the selector.
- **Content String**: A single translatable piece of visible text (label, heading, paragraph, placeholder, CTA, meta value). Identified by a unique key, belongs to a section and a language.
- **Section**: A logical grouping of content strings — Hero, Services, Technologies, Contact, Footer, Navigation, SEO.
- **Language Preference**: The visitor's currently active language choice. Persisted across visits from the same browser.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of visible user-facing text strings across all sections (Hero, Services, Technologies, Contact, Footer, Navigation) have complete translations in both Spanish and English — zero untranslated strings remain after switching.
- **SC-002**: Language switch completes and all visible content updates within 300 milliseconds of user interaction, with no perceptible flash or layout shift.
- **SC-003**: Automatic language detection correctly identifies and applies the right language for English and Spanish browser settings on first visit, requiring no manual intervention.
- **SC-004**: The page URL is identical in both languages, confirmed by observing the browser address bar before and after switching.
- **SC-005**: The browser tab title and meta description update to the correct language within the same interaction that triggers a language switch.
- **SC-006**: The language selector is reachable and operable via keyboard alone (Tab to focus, Enter/Space to activate), satisfying the project's WCAG AA accessibility requirement.
- **SC-007**: The page Lighthouse performance score remains 90 or above after the feature is implemented (no regression from adding language support).
- **SC-008**: Revisiting the site from the same browser applies the previously selected language without requiring the visitor to switch again.

---

## Assumptions

- The two supported languages (ES, EN) are fixed for this iteration; adding further languages is out of scope.
- Language preference persistence uses the browser's local storage mechanism; no user account or server-side session is required.
- No language-specific URLs (e.g., `/en/`, `/es/`) are needed; all language handling occurs on the client side with a single URL.
- The JSON-LD structured data already present in the page does not need to be translated in this iteration.
- Contact form submission and any backend responses are out of scope for translation in this iteration.
- The selector visually shows the currently active language so visitors always know which language is active.
