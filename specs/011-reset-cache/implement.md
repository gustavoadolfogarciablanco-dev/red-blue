# Implement: Force cache reset for static assets

## Goal
Force clients to fetch the latest CSS and JS immediately after deploy without changing cache headers.

## Steps
1. Add a version query string to the CSS and JS links in index.html.
2. Keep vercel.json headers unchanged.
3. Deploy and verify assets load with the new version token.
