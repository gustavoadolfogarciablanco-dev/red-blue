# Implement: Loading gate + hard HTML cache reset

## Goal
Prevent the initial flash of broken UI and force fresh HTML on every load.

## Steps
1. Add loader markup in index.html and CSS in main.css.
2. Gate rendering in main.js until i18n and window load (with timeout).
3. Add no-store headers for `/` and `/index.html`.
4. Bump CSS/JS version tokens and deploy.
