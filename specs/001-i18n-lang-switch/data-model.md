# Data Model: Multi-Language Support (ES / EN)

**Feature**: 001-i18n-lang-switch
**Date**: 2026-02-24

---

## Entities

### Language

Represents one of the two supported display languages.

| Field         | Type    | Values      | Description                                  |
|---------------|---------|-------------|----------------------------------------------|
| `code`        | string  | `'es'`, `'en'` | ISO 639-1 language code. Primary key.     |
| `label`       | string  | `'ES'`, `'EN'` | Display label shown in the selector.      |
| `htmlLang`    | string  | `'es'`, `'en'` | Value set on `<html lang="">` attribute.  |

---

### Translation Dictionary

A nested object keyed by `Language.code`, containing all translatable strings for the page. Each string is identified by a dot-notation key grouping section and field.

**Top-level shape**:

```
translations
  └── [langCode: 'es' | 'en']
        ├── seo
        ├── nav
        ├── hero
        ├── services
        ├── technologies
        ├── contact
        └── footer
```

**Complete key inventory**:

#### `seo`
| Key               | ES value (reference)                                          |
|-------------------|---------------------------------------------------------------|
| `seo.title`       | "Red and Blue – Desarrollo Web a Medida"                      |
| `seo.description` | "Desarrollo web a medida, automatización e IA para tu negocio." |

#### `nav`
| Key              | ES value (reference)      |
|------------------|---------------------------|
| `nav.cta`        | "Iniciar proyecto"        |
| `nav.langLabel`  | "EN" (label of OTHER lang)|

#### `hero`
| Key                  | ES value (reference)                                              |
|----------------------|-------------------------------------------------------------------|
| `hero.tag`           | "Desarrollo · IA · Automatización"                                |
| `hero.title`         | "Desarrollo web\na medida,\nseguro y escalable"                   |
| `hero.subtitle`      | "Construimos soluciones digitales que transforman tu negocio."    |
| `hero.cta.primary`   | "Iniciar proyecto"                                                |
| `hero.cta.secondary` | "Ver servicios"                                                   |
| `hero.badge.top`     | "Proyectos activos"                                               |
| `hero.badge.bottom`  | "Proyectos entregados"                                            |

#### `services`
| Key                   | ES value (reference)                                              |
|-----------------------|-------------------------------------------------------------------|
| `services.tag`        | "Qué hacemos"                                                     |
| `services.heading`    | "Soluciones que\nimpulsan tu negocio"                             |
| `services.web.title`  | "Desarrollo Web Personalizado"                                    |
| `services.web.desc`   | "Soluciones únicas adaptadas a las necesidades de tu negocio."    |
| `services.ai.title`   | "Integración con IA"                                              |
| `services.ai.desc`    | "Inteligencia Artificial aplicada a tus sistemas."                |
| `services.auto.title` | "Automatización de Procesos"                                      |
| `services.auto.desc`  | "Eliminamos tareas repetitivas y mejoramos la eficiencia."        |

#### `technologies`
| Key               | ES value (reference)                                              |
|-------------------|-------------------------------------------------------------------|
| `tech.tag`        | "Stack tecnológico"                                               |
| `tech.heading`    | "Herramientas de\nclase mundial"                                  |
| `tech.desc`       | "Trabajamos con las tecnologías más modernas."                    |

#### `contact`
| Key                       | ES value (reference)                                          |
|---------------------------|---------------------------------------------------------------|
| `contact.tag`             | "Hablemos"                                                    |
| `contact.heading`         | "Contáctanos para\ndesarrollo a medida"                       |
| `contact.desc`            | "Convertimos tus ideas en soluciones digitales."              |
| `contact.name.label`      | "Nombre completo"                                             |
| `contact.name.placeholder`| "Tu nombre"                                                   |
| `contact.email.label`     | "Correo electrónico"                                          |
| `contact.email.placeholder`| "tu@empresa.com"                                             |
| `contact.msg.label`       | "¿En qué podemos ayudarte?"                                   |
| `contact.msg.placeholder` | "Contanos sobre tu proyecto..."                               |
| `contact.submit`          | "Enviar mensaje"                                              |
| `contact.success`         | "✓ Mensaje enviado. Te contactamos en menos de 24hs."         |
| `contact.wa.aria`         | "Contactar por WhatsApp"                                      |
| `contact.email.aria`      | "Enviar correo a hola@redandblue.com"                         |

#### `footer`
| Key                | ES value (reference)                             |
|--------------------|--------------------------------------------------|
| `footer.nav.home`  | "Inicio"                                         |
| `footer.nav.services`| "Servicios"                                    |
| `footer.nav.tech`  | "Tecnologías"                                    |
| `footer.nav.contact`| "Contacto"                                      |
| `footer.copy`      | "© 2026 Red and Blue. Todos los derechos reservados." |
| `footer.made`      | "Hecho con precisión en Argentina."              |

---

### Language Preference

The user's active language choice, stored in the browser.

| Field     | Storage        | Values        | Description                          |
|-----------|----------------|---------------|--------------------------------------|
| `lang`    | localStorage   | `'es'`, `'en'`| Key: `'lang'`. Persists across visits.|

**Resolution priority** (read-only, evaluated once on page load):
1. `localStorage.getItem('lang')` if valid (`'es'` or `'en'`)
2. `navigator.language.slice(0,2)` if matches `'es'` or `'en'`
3. Default: `'es'`

---

## DOM Binding Contract

Each translatable element carries one or more `data-i18n-*` attributes that link the element to its translation key:

| Attribute             | Applied to               | Updates                   |
|-----------------------|--------------------------|---------------------------|
| `data-i18n="key"`     | Any element              | `element.textContent`     |
| `data-i18n-placeholder="key"` | `input`, `textarea` | `element.placeholder` |
| `data-i18n-aria="key"`| Any element with aria-label | `element.setAttribute('aria-label', ...)` |
| `data-i18n-html="key"`| Elements needing HTML content | `element.innerHTML`  |

Elements marked with these attributes are the only source of truth for what needs translation — the JavaScript module never hard-codes element selectors.
