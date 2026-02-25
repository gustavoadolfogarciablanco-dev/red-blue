# Red and Blue – Landing Page

Landing corporativa optimizada para SEO, con i18n (ES/EN), animaciones GSAP, formulario de contacto y despliegue continuo en Vercel.

**Empresa:** Red and Blue
**Servicios:** Desarrollo web a medida · Automatización · IA
**Deploy:** Vercel

---

## Tecnologias

- HTML5, CSS3, JavaScript ES6+ (sin frameworks pesados)
- i18n propio (ES/EN) en `js/i18n.js`
- GSAP + ScrollTrigger para animaciones
- Vercel (static + serverless)
- Spec Kit para specs y planes

---

## Estructura actual

```
.
├── api/
│   └── contact.js            # API serverless de contacto (Vercel)
├── css/
│   └── main.css              # Estilos globales
├── images/                   # Assets
├── js/
│   ├── i18n.js               # Diccionario y motor i18n
│   └── main.js               # UI, animaciones, form, filters
├── specs/                    # Specs/planes/tareas por feature
├── templates/                # Templates de contenido
├── agents/
│   └── claude.json
├── index.html
├── robots.txt
├── sitemap.xml
├── vercel.json               # Headers y cache
└── README.md
```

---

## Secciones

1. Hero
2. Servicios
3. Tecnologias (filtros + cards)
4. Contacto (form + WhatsApp)
5. Footer

---

## Cache y despliegue

- HTML se sirve con `no-store` para forzar revalidacion en cada deploy.
- CSS/JS se cachean con `immutable` y se versionan via query string en `index.html`.
- Deploy en Vercel:

```bash
vercel --prod
```

---

## Flujo Spec Kit

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
specify init . --ai claude --script ps
```

Comandos de trabajo:

```
/speckit.specify
/speckit.plan
/speckit.tasks
/speckit.implement
```

---

## Seguridad

`agents/claude.json` incluye un placeholder `"apiKey": "YOUR_API_KEY"`.
No subas claves reales al repo.
