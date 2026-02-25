# Data Model

## Entities
- **Nav scroll state**: boolean derived from `window.scrollY > 0` to toggle `.scrolled`.
- **Theme mode**: existing CSS variables (`--bg`, `--text`) used to compute contrast.

## Notes
No new persistent data is introduced.
