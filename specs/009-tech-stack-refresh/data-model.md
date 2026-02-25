# Data Model: Tech stack

## Entities
- TechCategory
  - key: all | frontend | backend | ai | infra
  - label
- TechCard
  - name
  - categoryKey
  - description
  - icon

## Constraints
- Each card belongs to exactly one category.
- Filters map 1:1 to categories.
