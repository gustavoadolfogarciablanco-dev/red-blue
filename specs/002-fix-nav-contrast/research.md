# Research

## Root cause
- `.nav.scrolled` background used an invalid `rgba(var(--bg), 0.85)` value.
- Scroll trigger waited for the hero to leave the viewport, so the nav stayed transparent too long.

## Decision
- Use `color-mix(in srgb, var(--bg) 85%, transparent)` for valid background.
- Toggle `.scrolled` on any `scrollY > 0`.
