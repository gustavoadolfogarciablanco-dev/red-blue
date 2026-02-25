# Implement: Fix nav contrast during hero scroll

## Steps
1. Update `.nav.scrolled` background to use `color-mix` with `--bg`.
2. Replace the IntersectionObserver with a passive scroll listener.
3. Toggle `.scrolled` when `window.scrollY > 0` and initialize on load.
