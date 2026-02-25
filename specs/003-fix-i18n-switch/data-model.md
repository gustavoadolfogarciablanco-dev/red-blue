# Data Model: i18n switch

## Entities
- Language Preference
  - key: rb-lang
  - values: es | en
  - storage: localStorage

- Translation Key
  - maps to data-i18n/data-i18n-html/data-i18n-placeholder/data-i18n-aria

## Constraints
- Apply language before UI interactions.
- Update all translatable nodes on switch.
