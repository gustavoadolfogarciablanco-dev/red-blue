# Research

## Observation
Vercel warns when a serverless function uses ESM syntax without module type configuration.

## Decision
Switch the handler to CommonJS export to remove the warning without changing behavior.
