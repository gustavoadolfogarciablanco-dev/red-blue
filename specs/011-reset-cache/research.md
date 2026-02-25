# Research

## Observation
Immutable cache headers keep old CSS/JS after deploy unless URLs change.

## Decision
Add a version token to asset URLs in `index.html` to force a refresh.
