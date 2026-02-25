# Tasks: Fix i18n switch not applying language

## Phase 1: Diagnose
- [x] T001 Confirm `#langToggle` exists in `index.html` and is unique
- [x] T002 Confirm `initI18n()` runs after DOM is ready and before UI use
- [x] T003 Check console for JS errors on click

## Phase 2: Fix
- [x] T004 Ensure click handler is attached to `#langToggle`
- [x] T005 Ensure `applyLanguage()` updates all `data-i18n*` attributes
- [x] T006 Ensure `document.title`, meta description, and `<html lang>` update

## Phase 3: Verify
- [x] T007 Verify EN/ES switches update all sections
- [x] T008 Verify language persists after reload
- [x] T009 Verify no console errors during switching
